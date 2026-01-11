import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    let progress = await prisma.progress.findUnique({
      where: { userId },
    });

    if (!progress) {
      progress = await prisma.progress.create({
        data: {
          userId,
          completedLevels: [],
          xp: 0,
          lastVisitedRoute: '/learn'
        }
      });
    }

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
    const { completedLevel, completedLevels, xp, xpToAdd, lastVisitedRoute, mythFactStats } = body;

    const progress = await prisma.progress.findUnique({
      where: { userId },
    });

    if (!progress) {
        // Initialize if missing
        const newProgress = await prisma.progress.create({
            data: {
                userId,
                completedLevels: completedLevels || (completedLevel ? [completedLevel] : []),
                xp: xp !== undefined ? Number(xp) : (xpToAdd ? Number(xpToAdd) : 0),
                lastVisitedRoute: lastVisitedRoute || '/learn',
                mythFactCorrect: mythFactStats?.correct || 0,
                mythFactTotal: mythFactStats?.total || 0
            }
        });
        
        return NextResponse.json({
            ...newProgress,
            mythFactStats: {
                correct: newProgress.mythFactCorrect,
                total: newProgress.mythFactTotal
            }
        });
    }

    const dataToUpdate: any = {};
    const currentLevels = progress.completedLevels;

    if (completedLevels && Array.isArray(completedLevels)) {
         // Merge unique levels from client and server
         const newLevels = Array.from(new Set([...currentLevels, ...completedLevels]));
         if (newLevels.length !== currentLevels.length) {
             dataToUpdate.completedLevels = newLevels;
         }
    } else if (completedLevel && !currentLevels.includes(completedLevel)) {
        dataToUpdate.completedLevels = [...currentLevels, completedLevel];
        
        // Log Activity for single level completion
        await prisma.activity.create({
            data: {
                userId,
                type: 'LEVEL_COMPLETE',
                description: `Completed level ${completedLevel}`,
                metadata: { level: completedLevel }
            }
        });
    }

    if (xp !== undefined) {
        // If absolute XP is provided (e.g. from client sync), use it if it's greater
        // or just trust the client? Trust client for sync.
        dataToUpdate.xp = Number(xp);
    } else if (xpToAdd) {
        dataToUpdate.xp = { increment: Number(xpToAdd) };
    }

    if (lastVisitedRoute) {
        dataToUpdate.lastVisitedRoute = lastVisitedRoute;
    }

    if (Object.keys(dataToUpdate).length === 0) {
        return NextResponse.json(progress);
    }

    const updatedProgress = await prisma.progress.update({
        where: { userId },
        data: dataToUpdate,
    });

    return NextResponse.json(updatedProgress);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
