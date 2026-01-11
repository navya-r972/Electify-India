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
    return NextResponse.json(user.preferences);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const user = await User.findOne({ email: DEMO_EMAIL });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.preferences = { ...user.preferences, ...body };
    await user.save();

    return NextResponse.json({ message: 'Preferences updated', preferences: user.preferences });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
