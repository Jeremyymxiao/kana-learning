import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // 定义需要登录的路径
        const protectedPaths = ["/profile"]
        const path = req.nextUrl.pathname
        
        // 如果是受保护的路径，需要有 token
        if (protectedPaths.some(p => path.startsWith(p))) {
          return !!token
        }
        // 其他路径都允许访问
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/profile"]
}