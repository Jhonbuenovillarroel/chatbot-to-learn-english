"use client";

import React, { useState, createContext, useContext } from "react";
import { Message } from "@/types/message";

interface Props {
  children: React.ReactNode;
}

export type ChatContext = {
  recentMessages: Message[];
  setRecentMessages: Function;
  addMessage: Function;
  chatbotTyping: boolean;
  setChatbotTyping: Function;
  botResponseAudioPath: string;
  setBotResponseAudioPath: Function;
  playChatbotAudio: boolean;
  setPlayChatbotAudio: Function;
};

export const ChatContext = createContext<ChatContext>({
  recentMessages: [],
  setRecentMessages: () => {},
  addMessage: () => {},
  chatbotTyping: false,
  setChatbotTyping: () => {},
  botResponseAudioPath: "",
  setBotResponseAudioPath: () => {},
  playChatbotAudio: false,
  setPlayChatbotAudio: () => {},
});

export const useChatContext = () => {
  return useContext(ChatContext);
};

const ChatContextProvider = ({ children }: Props) => {
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [chatbotTyping, setChatbotTyping] = useState<boolean>(false);
  const [botResponseAudioPath, setBotResponseAudioPath] = useState<any>("");
  const [playChatbotAudio, setPlayChatbotAudio] = useState<boolean>(false);

  const addMessage = (message: Message[]) => {
    setRecentMessages([...recentMessages, ...message]);
  };

  return (
    <ChatContext.Provider
      value={{
        recentMessages,
        setRecentMessages,
        addMessage,
        chatbotTyping,
        setChatbotTyping,
        botResponseAudioPath,
        setBotResponseAudioPath,
        playChatbotAudio,
        setPlayChatbotAudio,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
