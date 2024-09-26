import Image from "next/image";
import React from "react";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  return (
    <header className="h-24 flex items-center md:px-8 px-4">
      <div className="flex items-center justify-between w-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-16 py-4 w-96 rounded-[2rem] focus:outline-none border-none bg-white"
          />
          <span className="absolute top-1/2 left-1 p-3 rounded-full bg-purple-300 -translate-y-1/2">
            <IoIosSearch fontSize={23} />
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Image
            width={176}
            height={28}
            src={"/images/logo1.png"}
            alt="Logo"
            priority
          />
          <div className="flex flex-col text-md font-bold">
            <h3 className="">SBS Digital Infotech</h3>
            <span className="">April 2024</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
