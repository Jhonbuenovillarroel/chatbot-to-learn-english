import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        email: {
          label: "username",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "*********",
        },
      },

      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          const passwordMatches = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (passwordMatches) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
            };
          } else {
            throw new Error("Contraseña incorrecta");
          }
        } else {
          throw new Error("El usuario no existe");
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
