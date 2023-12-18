const generateChatCompletion = async (transcription: string) => {
  const response = await fetch("/api/generate-chat-completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transcription,
    }),
  });

  const result = await response.json();

  return result;
};

export { generateChatCompletion };
