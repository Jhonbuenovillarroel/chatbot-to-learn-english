"use client";

import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Navbar from "../Navbar/navbar";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  return (
    <header className="flex justify-between bg-black text-white items-center h-20 px-6">
      <div>
        <p>English Chatbot</p>
      </div>

      <div>
        <AiOutlineMenu
          onClick={() => {
            setShowNavbar(true);
          }}
          className="w-5 h-5 cursor-pointer"
        />

        {showNavbar && (
          <Navbar
            className="flex items-center justify-center fixed overflow-hidden transition-all duration-500 top-0 z-10 right-0 bottom-0 left-0 w-full bg-black"
            setShowNavbar={setShowNavbar}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
