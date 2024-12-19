import { NextResponse } from 'next/server';
import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 其余的处理逻辑...
} 