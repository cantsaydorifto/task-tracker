import authVerify from "@/util/authVerify";
import prisma from "@/util/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await authVerify();
    const tasks = await prisma.task.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ tasks });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || err || "ERROR" },
      { status: err.status || 400 }
    );
  }
}
