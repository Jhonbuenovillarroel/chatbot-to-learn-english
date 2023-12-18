import openai from "@/lib/openai";
import path from "path";
import fs from "fs";

const generarStringAleatorio = () => {
  const longitud = 20;
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let stringAleatorio = "";
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    stringAleatorio += caracteres.charAt(indiceAleatorio);
  }
  return stringAleatorio;
};

const createAudio = async (input: any) => {
  const stringAleatorio = `${generarStringAleatorio()}.mp3`;

  const speechFile = path.resolve(`./public/audios/${stringAleatorio}`);

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

  // console.log(speechFile);

  return `/audios/${stringAleatorio}`;
};

export { createAudio };
