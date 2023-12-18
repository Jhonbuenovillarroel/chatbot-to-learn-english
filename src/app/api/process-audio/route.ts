import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { createTranscription } from "@/actions/openai/audio/functions";
import { blobToAudio } from "@/utils/blob-to-audio";

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();

  const audioBlob: any = formData.get("audio");

  try {
    const filePath = await blobToAudio(audioBlob);

    const transcription = await createTranscription(filePath);

    return NextResponse.json({ transcription });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
