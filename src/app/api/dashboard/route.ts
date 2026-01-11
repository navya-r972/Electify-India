import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        progress: true,
        activities: {
            orderBy: { createdAt: 'desc' },
            take: 10
        }
      }
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
  user: {
    name: user.name,
    email: user.email,
    school: user.profile?.school || '',
    grade: user.profile?.grade || '',
    interests: user.profile?.interests || []
  },
  progress: {
    xp: user.progress?.xp ?? 0,
    level: user.progress?.level ?? 1,
    streak: user.progress?.streak ?? 0,
    completedLevels: user.progress?.completedLevels ?? [],
    lastVisitedRoute: user.progress?.lastVisitedRoute ?? '/learn',
    mythFactStats: {
      correct: user.progress?.mythFactCorrect ?? 0,
      total: user.progress?.mythFactTotal ?? 0
    }
  },
  recentActivities: user.activities.map(a => ({
    id: a.id,
    title: a.title,
    type: a.type,
    url: a.url,
    createdAt: a.createdAt
  }))
});

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
