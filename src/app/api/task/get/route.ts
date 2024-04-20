import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const task = await db.task.findMany();
    return NextResponse.json(task);
  } catch (error) {
    NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
