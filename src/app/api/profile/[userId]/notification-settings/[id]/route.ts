import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { UserNotificationSettings } from "@/feat/profile/dto";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string; id: string }> },
) {
  try {
    const { userId, id } = await params;

    const body = await request.json();

    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "notification-settings.json",
    );

    // Read JSON file
    const fileData = await fs.readFile(filePath, "utf8");
    const { data } = JSON.parse(fileData);

    // Find index to be updated
    const index = data.findIndex(
      (item: UserNotificationSettings) =>
        item.userId === +userId && item.id === +id,
    );

    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    data[index] = { ...data[index], ...body };

    // Write JSON file
    await fs.writeFile(filePath, JSON.stringify({ data: data }, null, 2));

    return NextResponse.json({ data: data[index] });
  } catch {
    return NextResponse.json(
      { message: "Failed to update data" },
      { status: 500 },
    );
  }
}
