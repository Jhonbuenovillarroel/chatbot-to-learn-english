import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatContextProvider from "@/components/Context/chat-context";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/header";
import Providers from "@/components/Providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot to learn english",
  description: "Chatbot de última generación para aprender inglés",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <Providers>
        <ChatContextProvider>
          <body
            className={`${inter.className} min-h-screen bg-zinc-950 antialiased`}
          >
            <Toaster />
            <Header />
            {children}
          </body>
        </ChatContextProvider>
      </Providers>
    </html>
  );
}
