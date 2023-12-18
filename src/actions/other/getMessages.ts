import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getMessages = async () => {
  const session: any = await getServerSession(authOptions);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    const messages = await prisma.message.findMany({
      where: {
        userId: user?.id,
      },
    });

    return messages;
  } catch (error) {
    throw new Error("Algo salió mal, intentalo nuevamente más tarde");
  }
};

export { getMessages };
