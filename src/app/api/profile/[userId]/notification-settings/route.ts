import { NextResponse } from "next/server";
import USER_NOTIFICATION_SETTINGS from "@/data/notification-settings.json";
import { UserNotificationSettings } from "@/feat/profile/dto";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
): Promise<NextResponse<UserNotificationSettings>> {
  const { userId } = await params;
  const response = USER_NOTIFICATION_SETTINGS.data.filter((user) => user.id === +userId)[0];

  return NextResponse.json(response, { status: 200 });
}
