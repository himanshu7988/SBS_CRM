import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHandshake, FaRegCircleUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoHelpCircleSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  return (
    <section
      className={`flex flex-col gap-12 h-screen w-72 bg-default lg:translate-x-0 duration-300 ease-linear ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-start md:px-6 md:py-12 px-4 py-6">
        <Link href="/dashboard" className="flex gap-2">
          <Image
            width={176}
            height={28}
            src={"/images/logo.png"}
            alt="Logo"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between px-4 py-4 md:px-6 h-full">
        <ul className="flex flex-col gap-4 ">
          <li>
            <Link
              href="/dashboard"
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer 
                ${(pathname === "/" || pathname === "/dashboard") &&  "text-yellow-400 border-r-4 border-yellow-400"}`}
            >
              <BiSolidDashboard fontSize={25} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/companies"
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${pathname.includes("/dashboard/companies") && "text-yellow-400 border-r-4 border-yellow-400" }`}
            >
              <FaUsers fontSize={25} />
              Companies
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/deals"
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${pathname.includes("/dashboard/deals") && "text-yellow-400 border-r-4 border-yellow-400" }`}
            >
              <FaHandshake fontSize={25} />
              Deals
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/contact"
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${pathname.includes("/dashboard/contact") && "text-yellow-400 border-r-4 border-yellow-400" }`}
            >
              <FaRegCircleUser fontSize={25} />
              Contacts
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/reports"
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${pathname.includes("/dashboard/reports") && "text-yellow-400 border-r-4 border-yellow-400" }`}
            >
              <TbReportSearch fontSize={25} />
              Reports
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/messages"
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${pathname.includes("/dashboard/messages") && "text-yellow-400 border-r-4 border-yellow-400" }`}
            >
              <MdMessage fontSize={25} />
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/logout"
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${pathname.includes("/dashboard/logout") && "text-yellow-400 border-r-4 border-yellow-400" }`}
            >
              <MdLogout fontSize={25} />
              Logout
            </Link>
          </li>
        </ul>


        <ul>
          <li>
            <Link
              href="/dashboard/help"
              className={`px-3 flex gap-2 items-center py-1 mb-6 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${pathname.includes("/dashboard/help") && "text-yellow-400 border-r-4 border-yellow-400" }`}
            >
              <IoHelpCircleSharp fontSize={25} />
              Help
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
