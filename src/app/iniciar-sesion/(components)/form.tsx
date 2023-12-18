"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import WriteLoading from "@/components/write-loading/write-loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Form = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <form
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const response = await signIn("credentials", {
          redirect: false,
          email: formData.get("email"),
          password: formData.get("password"),
        });

        if (response?.ok) {
          toast.success("Inicio de sesión exitoso");

          setTimeout(() => {
            setLoading(false);
            router.push("/app");
            router.refresh();
          }, 2000);
        } else if (response?.error) {
          toast.error(response.error);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      }}
      action=""
      className="bg-gradient-to-t w-[400px] from-zinc-900 to-emerald-900 flex flex-col gap-4 px-10 py-8 rounded-lg"
    >
      <p className="text-3xl font-semibold mb-2">Inicia Sesión</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="">
          Correo Electrónico
        </label>

        <input
          required
          type="email"
          id="email"
          name="email"
          className="bg-emerald-700 rounded-md py-1 h-auto px-3 outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="">
          Contraseña
        </label>

        <input
          required
          type="password"
          id="password"
          name="password"
          className="bg-emerald-700 rounded-md py-1 h-auto px-3 outline-none"
        />
      </div>

      <button
        disabled={loading}
        className="w-full h-12 flex items-center justify-center rounded-md text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 mt-4"
      >
        {loading ? <WriteLoading /> : <p>Iniciar Sesión</p>}
      </button>

      <div className="mt-8 flex flex-col justify-center items-center gap-4">
        <div className="flex items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-300"
          >
            Recuerdame
          </label>
        </div>

        <Link href="#" className="text-sm hover:underline">
          Olvidé mi contraseña
        </Link>
      </div>

      <p className="mt-8 text-center">
        Aún no tienes una cuenta?{" "}
        <Link
          href="/registro"
          className="text-emerald-500 hover:text-emerald-400"
        >
          Registrate
        </Link>
      </p>
    </form>
  );
};

export default Form;
