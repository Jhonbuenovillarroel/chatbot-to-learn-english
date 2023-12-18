import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  className: string;
  setShowNavbar: Function;
}

const Navbar = ({ className, setShowNavbar }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [height, setHeight] = useState<string>("h-0 opacity-0");

  const shrinkNavbar = () => {
    setHeight("h-0 opacity-0");
    setTimeout(() => {
      setShowNavbar(false);
    }, 300);
  };

  useEffect(() => {
    setHeight("h-full opacity-100");
  }, []);

  return (
    <nav className={`${className} ${height}`}>
      <AiOutlineClose
        onClick={() => {
          shrinkNavbar();
        }}
        className="w-7 h-7 cursor-pointer absolute top-5 right-6"
      />

      <ul className="flex flex-col items-center justify-center gap-4">
        <li>
          <Link
            onClick={() => {
              shrinkNavbar();
            }}
            href="/"
            className="text-lg"
          >
            Home
          </Link>
        </li>

        {session ? (
          <button
            onClick={() => {
              shrinkNavbar();
              signOut();
            }}
            className="px-4 py-3 h-auto text-lg rounded-md bg-zinc-900"
          >
            Cerrar Sesión
          </button>
        ) : (
          <button
            onClick={() => {
              shrinkNavbar();
              setTimeout(() => {
                router.push("/iniciar-sesion");
              }, 300);
            }}
            className="px-4 py-3 h-auto text-lg rounded-md bg-emerald-800"
          >
            Iniciar Sesión
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
