"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import WriteLoading from "@/components/write-loading/write-loading";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <form
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const response = await fetch("/api/register-user", {
          method: "POST",
          body: JSON.stringify({
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        });

        if (response.ok) {
          toast.success("Usuario creado exitosamente");
          setTimeout(() => {
            setLoading(false);
            router.push("/iniciar-sesion");
            router.refresh();
          }, 2000);
        } else {
          const result = await response.json();

          toast.error(result.error);

          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      }}
      className="bg-gradient-to-t w-[400px] from-zinc-900 to-emerald-900 flex flex-col gap-6 px-10 py-8 rounded-lg"
    >
      <p className="text-3xl font-semibold mb-2">Registrate</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="">
          Nombre de usuario
        </label>

        <input
          required
          type="text"
          id="username"
          name="username"
          className="bg-emerald-700 rounded-md py-1 h-auto px-3 outline-none"
        />
      </div>

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
        onClick={() => {}}
        disabled={loading}
        className="w-full flex items-center justify-center h-14 rounded-md text-white bg-zinc-950 hover:bg-zinc-900 transition-all duration-300 mt-4"
      >
        {loading ? <WriteLoading /> : <p>Registrarse</p>}
      </button>

      <div className="mt-8 flex justify-between">
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

      <p className="mt-8 flex justify-center gap-2">
        <span>Ya tienes una cuenta?</span>{" "}
        <Link
          href="/iniciar-sesion"
          className="text-emerald-500 hover:text-emerald-400"
        >
          Inicia Sesión
        </Link>
      </p>
    </form>
  );
};

export default Form;
