import { generateChatCompletion } from "@/actions/openai/chat/generateChatCompletion";

const processAudio = async (formData: FormData) => {
  const response = await fetch("/api/process-audio", {
    method: "POST",
    body: formData,
  });

  const { transcription } = await response.json();

  return transcription;
};

const iniciarGrabacion = async ({
  mediaRecorder,
  addMessage,
  setChatbotTyping,
  setBotResponseAudioPath,
  setPlayChatbotAudio,
}: {
  mediaRecorder: MediaRecorder;
  addMessage: Function;
  setChatbotTyping: Function;
  setBotResponseAudioPath: Function;
  setPlayChatbotAudio: Function;
}) => {
  let audioChunks: any = [];
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event: any) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

    const formData = new FormData();

    formData.append("audio", audioBlob, "audio.webm");

    const transcription = await processAudio(formData);

    addMessage([
      {
        id: "",
        role: "user",
        content: transcription,
        userId: "",
      },
    ]);

    setChatbotTyping(true);

    const { newMessages, audioPath } = await generateChatCompletion(
      transcription
    );
    setBotResponseAudioPath(audioPath);

    setChatbotTyping(false);
    addMessage([
      {
        id: "",
        role: "user",
        content: transcription,
        userId: "",
      },
      { ...newMessages[newMessages.length - 1], id: "", userId: "" },
    ]);

    setPlayChatbotAudio(true);
  };

  mediaRecorder.start();

  return mediaRecorder;
};

const pararGrabacion = (mediaRecorder: MediaRecorder) => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
};

export { iniciarGrabacion, pararGrabacion };
