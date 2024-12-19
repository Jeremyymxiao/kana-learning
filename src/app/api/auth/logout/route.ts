import { NextResponse } from "next/server"
import { signOut } from "@/app/api/auth/[...nextauth]/route"

export async function POST() {
  await signOut()
  return NextResponse.json({ success: true })
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