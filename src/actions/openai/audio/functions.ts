"use server";

import fs from "fs";
import openai from "@/lib/openai";

const createTranscription = async (filePath: string) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });

    console.log(transcription.text);

    return transcription.text;
  } catch (error) {
    throw new Error("Algo salió mal");
  }
};

export { createTranscription };
