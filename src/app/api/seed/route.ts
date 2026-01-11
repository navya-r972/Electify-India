import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const DEMO_EMAIL = 'demo@electify.in';

export async function GET() {
  await dbConnect();
  try {
    // Delete existing demo user if exists
    await User.deleteOne({ email: DEMO_EMAIL });

    // Create fresh demo user
    const newUser = await User.create({
      email: DEMO_EMAIL,
      name: 'Demo User',
      preferences: {
        language: 'English',
        audioEnabled: true,
        blindReadEnabled: false,
      },
      progress: {
        completedModules: ['module-1'],
        inProgressModules: ['module-2'],
        totalModules: 7,
        lastModule: 'module-2',
        xp: 150,
        streak: 3,
        level: 2,
      },
      recentlyViewed: [
        {
          title: 'Introduction to ONOE',
          type: 'module',
          url: '/learn/module-1',
          timestamp: new Date()
        },
        {
          title: 'History of Elections',
          type: 'module',
          url: '/learn/module-2',
          timestamp: new Date(Date.now() - 86400000) // 1 day ago
        }
      ]
    });

    return NextResponse.json({ message: 'Database seeded successfully', user: newUser });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}
