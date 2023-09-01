import authVerify from "@/util/authVerify";
import prisma from "@/util/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

function getTaskSchema() {
  return z.object({
    content: z.string({ required_error: "Content is required" }),
    title: z.string({ required_error: "Title is required" }),
  });
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const taskInfo = getTaskSchema().safeParse(reqBody);

    if (!taskInfo.success)
      throw { status: 400, message: taskInfo.error.issues[0].message };

    const user = await authVerify();
    const post = await prisma.task.create({
      data: {
        authorId: user.id,
        content: taskInfo.data.content,
        title: taskInfo.data.title,
      },
    });
    return NextResponse.json({ createdPost: post });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || err || "ERROR" },
      { status: err.status || 400 }
    );
  }
}
