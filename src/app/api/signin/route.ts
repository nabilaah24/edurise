import USER_DATA from "@/data/user.json";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const response = USER_DATA.data.find(
    (user) => user.email === email && user.password === password,
  );

  if (!response) {
    return NextResponse.json(
      { error: "Username atau password salah" },
      { status: 401 },
    );
  }

  const { password: _, ...userWithoutPassword } = response;
  return NextResponse.json(userWithoutPassword, { status: 200 });
}
