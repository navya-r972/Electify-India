import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const DEMO_EMAIL = 'demo@electify.in';

export async function GET() {
  await dbConnect();
  try {
    const user = await User.findOne({ email: DEMO_EMAIL });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Calculate percentage based on totalModules
    const completedCount = user.progress.completedModules.length;
    const totalCount = user.progress.totalModules || 7;
    const percentage = Math.round((completedCount / totalCount) * 100);

    return NextResponse.json({
      completed: completedCount,
      inProgress: user.progress.inProgressModules.length,
      total: totalCount,
      percentage: percentage,
      lastModule: user.progress.lastModule,
      xp: user.progress.xp || 0,
      streak: user.progress.streak || 0,
      level: user.progress.level || 1,
      completedModules: user.progress.completedModules,
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { moduleId, action, xpEarned } = body;
    
    const user = await User.findOne({ email: DEMO_EMAIL });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'start_module') {
      if (!user.progress.inProgressModules.includes(moduleId)) {
        user.progress.inProgressModules.push(moduleId);
      }
      user.progress.lastModule = moduleId;
    } 
    else if (action === 'complete_module') {
      // Remove from inProgress
      user.progress.inProgressModules = user.progress.inProgressModules.filter((id: string) => id !== moduleId);
      
      // Add to completed if not already there
      if (!user.progress.completedModules.includes(moduleId)) {
        user.progress.completedModules.push(moduleId);
      }
      
      // Update XP
      if (xpEarned) {
        user.progress.xp = (user.progress.xp || 0) + xpEarned;
      }
    }
    else if (action === 'update_xp') {
      if (xpEarned) {
        user.progress.xp = (user.progress.xp || 0) + xpEarned;
      }
    }

    await user.save();

    return NextResponse.json({ 
      message: 'Progress updated', 
      progress: user.progress 
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
