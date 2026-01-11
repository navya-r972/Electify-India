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
    
    // Sort recently viewed by timestamp descending
    const sorted = user.recentlyViewed.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json(sorted);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { title, type, url } = body;
    
    if (!title || !url) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await User.findOne({ email: DEMO_EMAIL });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove existing entry with same URL if exists to avoid duplicates/bring to top
    const filtered = user.recentlyViewed.filter((item: any) => item.url !== url);
    
    // Add new item to beginning
    filtered.unshift({
        title,
        type: type || 'page',
        url,
        timestamp: new Date()
    });

    // Limit to last 10 items
    user.recentlyViewed = filtered.slice(0, 10);
    
    await user.save();

    return NextResponse.json({ message: 'History updated', recentlyViewed: user.recentlyViewed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
