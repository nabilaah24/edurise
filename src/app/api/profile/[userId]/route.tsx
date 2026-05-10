import { NextResponse } from "next/server";
import USER_DATA from "@/data/user.json";
import { UserResponse } from "@/feat/profile/dto";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
): Promise<NextResponse<{ data: UserResponse | null; error?: string }>> {
  const { userId } = await params;
  const response = USER_DATA.data.find((user) => user.id === +userId);

  if (!response)
    return NextResponse.json(
      { data: null, error: "Profile not found" },
      { status: 404 },
    );

  return NextResponse.json({ data: response }, { status: 200 });
}
