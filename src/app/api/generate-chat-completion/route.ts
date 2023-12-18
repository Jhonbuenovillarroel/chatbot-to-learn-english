import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";
import { Message } from "@/types/message";
import prisma from "@/lib/prisma";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import path from "path";
import { createAudio } from "@/actions/openai/audio/createAudio";

async function createChatCompletion({
  messages,
  userQuery,
}: {
  messages: Message[];
  userQuery: Message;
}) {
  const array: any = [];

  for (let i = 0; i < [...messages, userQuery].length; i++) {
    array.push({
      role: [...messages, userQuery][i].role,
      content: [...messages, userQuery][i].content,
    });
  }

  const completion = await openai.chat.completions.create({
    messages: array,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { transcription } = body;

  const session: any = await getServerSession(authOptions);

  const messages = await prisma.message.findMany();

  const userQuery = {
    id: "",
    role: "user",
    content: transcription,
    userId: "",
  };

  const completion = await createChatCompletion({
    messages,
    userQuery,
  });

  const audioPath = await createAudio(completion.content);

  const previousChats = messages.map((message) => {
    return { role: message.role, content: message.content };
  });

  const newMessages: any = [
    { role: "user", content: transcription },
    completion,
  ];

  await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: {
      messages: {
        create: newMessages,
      },
    },
  });

  return NextResponse.json({
    newMessages,
    audioPath,
  });
}
