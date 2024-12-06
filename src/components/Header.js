import React from "react";
import { IoIosSearch } from "react-icons/io";
import Profile from "@/components/modals/Profile";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="h-20 md:h-24 flex items-center md:px-8 px-4 md:shadow-none shadow-md sticky top-0 bg-gray-100 z-10">
      <div className="flex items-center justify-between flex-row-reverse md:flex-row w-full">
        <div
          className="md:hidden block"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {!sidebarOpen ? (
            <RxHamburgerMenu className="text-3xl" />
          ) : (
            <RxCross2 className="text-3xl" />
          )}
        </div>
        <div className="md:block relative hidden">
          <input
            type="text"
            placeholder="Search"
            className="px-16 py-4 w-96 rounded-[2rem] focus:outline-none border-none bg-white"
          />
          <span className="absolute top-1/2 left-1 p-3 rounded-full bg-purple-300 -translate-y-1/2">
            <IoIosSearch fontSize={23} />
          </span>
        </div>
        <div className="flex items-center">
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
