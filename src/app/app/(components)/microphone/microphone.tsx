"use client";

import WriteLoading from "@/components/write-loading/write-loading";
import React, { useContext, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { AiFillAudio } from "react-icons/ai";
import { BsFillSquareFill } from "react-icons/bs";
import { iniciarGrabacion, pararGrabacion } from "@/utils/audioUtils";
import styles from "./microphone.module.css";
import { ChatContext, useChatContext } from "@/components/Context/chat-context";

const Microphone = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const {
    recentMessages,
    setRecentMessages,
    addMessage,
    setChatbotTyping,
    setBotResponseAudioPath,
    setPlayChatbotAudio,
  } = useChatContext();

  const mediaRecorderRef = useRef<any>(null);
  return (
    <>
      {recording ? (
        <div
          className={`flex cursor-pointer fixed justify-center bg-zinc-800 rounded-full w-20 h-20 right-1/2 translate-x-1/2 bottom-4 ${styles["animation-pulse"]}`}
        >
          <button
            onClick={async () => {
              pararGrabacion(mediaRecorderRef.current);

              setRecording(false);
            }}
            className="text-white rounded-full w-full h-full text-lg flex gap-3 items-center justify-center"
          >
            <BsFillSquareFill className="text-white w-6 h-6" />
          </button>
        </div>
      ) : (
        <div
          className={`flex cursor-pointer fixed justify-center bg-emerald-700 rounded-full w-20 h-20 left-1/2 translate-x-[-50%] bottom-4`}
        >
          <button
            onClick={async () => {
              const mediaRecorder = await iniciarGrabacion({
                mediaRecorder: mediaRecorderRef.current,
                addMessage,
                setChatbotTyping,
                setBotResponseAudioPath,
                setPlayChatbotAudio,
              });

              mediaRecorderRef.current = mediaRecorder;

              setRecording(true);
            }}
            className="text-white rounded-full w-full h-full text-lg flex gap-3 items-center justify-center"
          >
            <AiFillAudio className="text-white w-8 h-8" />
          </button>
        </div>
      )}
    </>
  );
};

export default Microphone;
