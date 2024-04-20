import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return await db.$transaction(async (tx) => {
      const updateTask = await tx.task.update({
        where: {
          id: body.taskID,
        },
        data: {
          name: body.name,
        },
      });
      await tx.updateCount.upsert({
        where: { id: 1 },
        create: { count: 1 },
        update: { count: { increment: 1 } },
      });
      return NextResponse.json(updateTask);
    });
  } catch (error) {
    NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
