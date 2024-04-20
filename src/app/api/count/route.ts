import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const addCountOperationData = await db.addCount.findFirst();
    const updateCountOperationData = await db.updateCount.findFirst();
    return NextResponse.json({
      addCount: addCountOperationData?.count ?? 0,
      updateCount: updateCountOperationData?.count ?? 0,
    });
  } catch (error) {
    NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
