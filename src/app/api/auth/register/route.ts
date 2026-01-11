import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Please add all fields' }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    // Create user with default profile and progress
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: {
          create: {
            interests: []
          }
        },
        progress: {
          create: {
            completedLevels: [],
            xp: 0,
            lastVisitedRoute: '/learn'
          }
        },
        activities: {
            create: {
                type: 'REGISTER',
                title: 'User Registered',
                url: ''
            }
        }
      },
    });

    return NextResponse.json({
      _id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
