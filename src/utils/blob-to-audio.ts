import path from "path";
import { writeFile } from "fs/promises";

const blobToAudio = async (audioBlob: File) => {
  const bytes = await audioBlob.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", audioBlob.name);

  try {
    await writeFile(filePath, buffer);

    return filePath;
  } catch (error) {
    throw new Error("Algo salió mal");
  }
};

export { blobToAudio };
