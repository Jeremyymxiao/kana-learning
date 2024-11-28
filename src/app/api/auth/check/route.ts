import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const verifiedToken = await verifyJwtToken(token);
    if (!verifiedToken) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // 从token中提取用户信息
    const { userId, email, username } = verifiedToken;
    const user = {
      id: userId,
      email,
      username,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Token verification:', {
      token,
      verifiedToken
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
