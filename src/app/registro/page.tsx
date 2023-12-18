import Image from "next/image";
import Link from "next/link";
import React, { FormEvent } from "react";
import Form from "./(components)/form";

const Page = () => {
  return (
    <main className="min-h-screen text-white bg-zinc-950">
      <section className="">
        <div className="flex py-28 justify-center items-center">
          <Form />
        </div>
      </section>
    </main>
  );
};

export default Page;
