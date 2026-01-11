import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken, hashPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      school: user.profile?.school || '',
      grade: user.profile?.grade || '',
      interests: user.profile?.interests || [],
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, school, grade, interests, password } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
        profile: {
          upsert: {
            create: {
              school,
              grade,
              interests: interests || [],
            },
            update: {
              school,
              grade,
              interests: interests || [],
            },
          }
        }
      },
      include: {
        profile: true
      }
    });

    const token = request.headers.get('authorization')?.split(' ')[1];

    return NextResponse.json({
      _id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      school: user.profile?.school || '',
      grade: user.profile?.grade || '',
      interests: user.profile?.interests || [],
      token,
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
