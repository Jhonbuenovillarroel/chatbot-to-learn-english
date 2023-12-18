import { getMessages } from "@/actions/other/getMessages";
import ChatMessageList from "./(components)/message-list/message-list";

const getData = async () => {
  const messages = await getMessages();

  return messages;
};

const Page = async () => {
  const messages = await getData();

  return (
    <main className="w-full bg-zinc-950">
      <ChatMessageList messages={messages} />
    </main>
  );
};

export default Page;
