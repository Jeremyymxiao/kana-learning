import { NextResponse } from 'next/server';

export async function GET() {
  // 简化处理：直接返回未登录状态，但是是一个正常的响应
  return NextResponse.json(
    { 
      user: null,
      // 可以添加一个标志，表明这是临时的未认证状态
      message: 'Authentication not implemented yet'
    },
    { status: 200 }  // 改为 200 状态码，这样不会触发错误
  );
}
