import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { UserRole } from "@/types/user";
import connectDB from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    // 验证必填字段
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "请填写所有必填字段" },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "邮箱格式不正确" }, { status: 400 });
    }

    // 验证用户名长度
    if (username.length < 2 || username.length > 20) {
      return NextResponse.json(
        { error: "用户名长度应在2-20个字符之间" },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: "密码长度至少为6个字符" },
        { status: 400 }
      );
    }

    await connectDB();

    // 检查邮箱是否已存在
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 400 });
    }

    // 检查用户名是否已存在
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return NextResponse.json({ error: "该用户名已被使用" }, { status: 400 });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await User.create({
      email,
      username,
      passwordHash: hashedPassword,
      role: UserRole.FREE
    });

    return NextResponse.json({
      message: "注册成功",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error("注册错误:", error);
    return NextResponse.json(
      { error: "注册失败，请稍后重试" },
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