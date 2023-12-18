"use client";

import React, { useEffect, useRef, useState } from "react";
import Microphone from "../microphone/microphone";
import { useChatContext } from "@/components/Context/chat-context";
import { useSession } from "next-auth/react";
import { Message } from "@/types/message";
import styles from "./message-list.module.css";
import WriteLoading from "@/components/write-loading/write-loading";

interface Props {
  messages: Message[];
}

const ChatMessageList = ({ messages }: Props) => {
  const { data: session, status } = useSession();
  const {
    recentMessages,
    chatbotTyping,
    botResponseAudioPath,
    playChatbotAudio,
    setPlayChatbotAudio,
  } = useChatContext();
  const messagesContainerRef = useRef<HTMLTableSectionElement>(null);

  // const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // @ts-ignore
    window.scrollTo(0, messagesContainerRef.current?.clientHeight);
  });

  useEffect(() => {
    if (playChatbotAudio) {
      if (
        messagesContainerRef.current?.childNodes[1] &&
        //@ts-ignore
        messagesContainerRef.current?.childNodes[1].classList.contains(
          "botAudioResponse"
        )
      ) {
        const child: any = document.querySelector(".botAudioResponse");

        console.log(child);

        messagesContainerRef.current.removeChild(child);
        const audioElement = document.createElement("audio");
        audioElement.src = botResponseAudioPath;
        audioElement.classList.add("botAudioResponse");

        messagesContainerRef.current?.appendChild(audioElement);
        audioElement.playbackRate = 1;

        audioElement.play();
        setPlayChatbotAudio(false);
      } else {
        const audioElement = document.createElement("audio");
        audioElement.src = botResponseAudioPath;
        audioElement.classList.add("botAudioResponse");
        audioElement.playbackRate = 1;
        audioElement.play();

        messagesContainerRef.current?.appendChild(audioElement);
        setPlayChatbotAudio(false);
      }
    }
  }, [playChatbotAudio, botResponseAudioPath, setPlayChatbotAudio]);

  return (
    <>
      <section
        ref={messagesContainerRef}
        className={`px-8 py-10 mb-24 scroll-smooth`}
      >
        <div className="flex flex-col gap-8">
          {messages.length === 0 && recentMessages.length === 0 ? (
            <p className="text-white text-center">Aún no hay mensajes</p>
          ) : (
            <>
              {[...messages, ...recentMessages].map((message, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[220px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] gap-3 w-fit px-4 py-4 rounded-lg ${
                    message.role === "user"
                      ? "self-end bg-emerald-900 text-white"
                      : "self-start bg-white text-black"
                  }`}
                >
                  <p className="">{message.content}</p>
                </div>
              ))}
              {chatbotTyping && (
                <div
                  className={`flex flex-col max-w-[220px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] gap-3 w-fit px-4 py-4 rounded-lg self-start bg-white text-black`}
                >
                  <WriteLoading />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Microphone />
    </>
  );
};

export default ChatMessageList;
