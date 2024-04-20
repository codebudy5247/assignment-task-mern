import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return await db.$transaction(async (tx) => {
      await tx.task.deleteMany();
      const task = await tx.task.create({
        data: {
          ...body,
        },
      });
      await tx.addCount.upsert({
        where: { id: 1 },
        create: { count: 1 },
        update: { count: { increment: 1 } },
      });
      return NextResponse.json(task);
    });
  } catch (error) {
    NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
