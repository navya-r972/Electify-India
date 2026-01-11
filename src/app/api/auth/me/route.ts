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
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
        ...user,
        _id: user.id
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
