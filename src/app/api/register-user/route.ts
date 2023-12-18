import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  try {
    const usernameExists = await prisma.user.findUnique({
      where: {
        name: username,
      },
    });
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (usernameExists) {
      return NextResponse.json(
        { error: "Este nombre de usuario ya existe" },
        { status: 401 }
      );
    } else if (emailExists) {
      return NextResponse.json(
        { error: "Este correo electrónico ya existe" },
        { status: 401 }
      );
    } else {
      const passwordHashed = await bcrypt.hash(password, 12);

      const newUser = await prisma.user.create({
        data: {
          name: username,
          email,
          password: passwordHashed,
        },
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
