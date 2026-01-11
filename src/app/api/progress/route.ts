import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    // Upsert ensures we always have a record
    const progress = await prisma.progress.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        completedLevels: [],
        xp: 0,
        level: 1,
        streak: 0,
        lastVisitedRoute: '/learn',
        mythFactCorrect: 0,
        mythFactTotal: 0
      }
    });

    return NextResponse.json(progress);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      completedLevel, 
      completedLevels, 
      xp, 
      xpToAdd, 
      lastVisitedRoute, 
      mythFactStats,
      streak
    } = body;

    const existing = await prisma.progress.findUnique({ where: { userId } });

    // Calculate new values
    let newLevels = existing?.completedLevels || [];
    if (completedLevels && Array.isArray(completedLevels)) {
        newLevels = Array.from(new Set([...newLevels, ...completedLevels]));
    }
    if (completedLevel && !newLevels.includes(completedLevel)) {
        newLevels.push(completedLevel);
    }

    const newXp = xp !== undefined 
        ? Number(xp) 
        : (existing?.xp || 0) + (Number(xpToAdd) || 0);

    const newStreak = streak !== undefined ? Number(streak) : (existing?.streak || 0);
    const newLevel = Math.floor(newXp / 100) + 1; // Example logic

    const updateData: any = {
        completedLevels: newLevels,
        xp: newXp,
        level: newLevel,
        streak: newStreak,
    };

    if (lastVisitedRoute) {
        updateData.lastVisitedRoute = lastVisitedRoute;
    }

    if (mythFactStats) {
        updateData.mythFactCorrect = mythFactStats.correct;
        updateData.mythFactTotal = mythFactStats.total;
    }

    const updated = await prisma.progress.upsert({
        where: { userId },
        create: {
            userId,
            completedLevels: newLevels,
            xp: newXp,
            level: newLevel,
            streak: newStreak,
            lastVisitedRoute: lastVisitedRoute || '/learn',
            mythFactCorrect: mythFactStats?.correct || 0,
            mythFactTotal: mythFactStats?.total || 0
        },
        update: updateData
    });

    // --- Activity Logging ---

    // 1. Level Completion
    if (completedLevel && (!existing || !existing.completedLevels.includes(completedLevel))) {
        await prisma.activity.create({
            data: {
                userId,
                type: 'LEVEL_COMPLETE',
                title: `Completed Level ${completedLevel}`,
                url: `/learn/${completedLevel}`
            }
        });
    }

    // 2. Module View (if lastVisitedRoute changed)
    if (lastVisitedRoute && lastVisitedRoute !== existing?.lastVisitedRoute) {
        await prisma.activity.create({
            data: {
                userId,
                type: 'MODULE_VIEW',
                title: 'Viewed Learning Module',
                url: lastVisitedRoute
            }
        });
    }

    // 3. Fact vs Myth (if stats changed)
    if (mythFactStats && existing && mythFactStats.total > existing.mythFactTotal) {
        await prisma.activity.create({
            data: {
                userId,
                type: 'FACT_MYTH',
                title: 'Played Fact vs Myth',
                url: '/fact-check'
            }
        });
    }

    return NextResponse.json(updated);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
