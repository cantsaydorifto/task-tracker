import authVerify from "@/util/authVerify";
import prisma from "@/util/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: { id: number } }
) {
  try {
    const { id } = context.params;
    if (isNaN(id)) {
      throw { status: 400, message: "Id Is A Number" };
    }
    await authVerify();
    await prisma.task_Task.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "Deleted Task" });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || err || "ERROR" },
      { status: err.status || 400 }
    );
  }
}
