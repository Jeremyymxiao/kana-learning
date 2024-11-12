import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    
    // 验证请求数据
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    const client = await clientPromise
    const usersCollection = client.db("kana-learning").collection("users")
    
    // 检查邮箱是否已存在
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      )
    }

    // 密码加密
    const hashedPassword = await hash(password, 10)
    
    // 创建新用户
    await usersCollection.insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { success: true, message: "User registered successfully" }, 
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    )
  }
}