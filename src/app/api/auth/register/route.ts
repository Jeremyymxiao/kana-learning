import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    console.log('Received registration request'); 
    const body = await request.json();
    console.log('Request body:', body); 

    const { email, username, password } = body;

    // Validate required fields
    if (!email || !username || !password) {
      console.log('Missing required fields'); 
      return NextResponse.json({ 
        error: '请填写所有必填字段' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format'); 
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400 });
    }

    // Validate username length
    if (username.length < 3 || username.length > 20) {
      console.log('Invalid username length'); 
      return NextResponse.json({ error: '用户名长度应在3-20个字符之间' }, { status: 400 });
    }

    // Validate password strength
    if (password.length < 6) {
      console.log('Password too short'); 
      return NextResponse.json({ error: '密码长度至少为6个字符' }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    });
    if (existingEmail) {
      console.log('Email already exists'); 
      return NextResponse.json({ error: '该邮箱已被注册' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    console.log('Creating new user...'); 
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash
      }
    });
    console.log('User created successfully:', user.id); 

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' }  // 改为30天
    );

    // 设置响应头
    const headers = {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://learnkana.pro',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // 创建响应
    const response = NextResponse.json({
      message: '注册成功',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    }, { headers });

    // 设置 cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60  // 改为30天
    });

    return response;

  } catch (error) {
    console.error('Registration error details:', error); 
    
    // 检查是否是 Prisma 错误
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma error code:', error.code);
      // 处理特定的 Prisma 错误
      switch (error.code) {
        case 'P2002':
          return NextResponse.json({ error: '该用户名或邮箱已被使用' }, { status: 400 });
        default:
          return NextResponse.json({ error: '数据库操作失败' }, { status: 500 });
      }
    }

    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// OPTIONS 请求处理 CORS 预检请求
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://learnkana.pro',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}