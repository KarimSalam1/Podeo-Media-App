import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (username === "admin" && password === "password") {
      return NextResponse.json({
        success: true,
        user: { username },
        token: "mock-jwt-token",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
