import { NextResponse } from 'next/server';
import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ isAuthenticated: false })
  }

  return NextResponse.json({
    isAuthenticated: true,
    user: session.user
  })
}
