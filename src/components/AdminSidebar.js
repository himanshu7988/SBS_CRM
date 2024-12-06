import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHandshake, FaRegCircleUser, FaUsersGear } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import { FaUsers } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { VscBriefcase } from "react-icons/vsc";
// import { MdMessage } from "react-icons/md";
// import { TbReportSearch } from "react-icons/tb";
// import { IoHelpCircleSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  return (
    <section
      className={`fixed md:relative z-10 flex flex-col gap-12 h-screen w-64 md:w-72 bg-default md:translate-x-0 duration-300 ease-linear ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex flex-col justify-center items-start ">
        <Link
          href="/selectCompany"
          className="text-white flex w-full justify-end px-6 pt-3"
        >
          <TiArrowBack fontSize={25} className="cursor-pointer" />
        </Link>
        <Link href="/dashboard" className="flex gap-2 py-6 md:px-6 px-4">
          <Image
            width={176}
            height={28}
            src={"/images/logo.png"}
            alt="Logo"
            priority
          />
        </Link>
      </div>

      <div className="flex flex-col justify-between px-4 py-4 md:px-6 h-full overflow-y-auto scrollbar-hide gap-12">
        <ul className="flex flex-col gap-4 ">
          <li>
            <Link
              href="/adminDashboard"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer 
                ${
                  (pathname === "/" || pathname === "/adminDashboard") &&
                  "text-yellow-400 border-r-4 border-yellow-400"
                }`}
            >
              <BiSolidDashboard fontSize={25} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/adminDashboard/companyManagement"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${
                pathname.includes("/adminDashboard/companyManagement") &&
                "text-yellow-400 border-r-4 border-yellow-400"
              }`}
            >
              <VscBriefcase fontSize={25} />
              Companies
            </Link>
          </li>
          <li>
            <Link
              href="/adminDashboard/users"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${
                pathname.includes("/adminDashboard/users") &&
                "text-yellow-400 border-r-4 border-yellow-400"
              }`}
            >
              <FaUsers fontSize={25} />
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/adminDashboard/roles"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${
                pathname.includes("/adminDashboard/roles") &&
                "text-yellow-400 border-r-4 border-yellow-400"
              }`}
            >
              <FaUsersGear fontSize={25} />
              Roles
            </Link>
          </li>
          {/* <li>
            <Link
              href="/dashboard/reports"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${
                pathname.includes("/dashboard/reports") &&
                "text-yellow-400 border-r-4 border-yellow-400"
              }`}
            >
              <TbReportSearch fontSize={25} />
              Reports
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/messages"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${
                pathname.includes("/dashboard/messages") &&
                "text-yellow-400 border-r-4 border-yellow-400"
              }`}
            >
              <MdMessage fontSize={25} />
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/help"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 mb-6 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${
                pathname.includes("/dashboard/help") &&
                "text-yellow-400 border-r-4 border-yellow-400"
              }`}
            >
              <IoHelpCircleSharp fontSize={27} />
              Help
            </Link>
          </li> */}
        </ul>

        <ul>
          <li>
            <Link
              href="/dashboard/logout"
              onClick={() => setSidebarOpen(false)}
              className={`px-3 flex gap-2 items-center py-1 text-xl text-white font-light hover:text-yellow-400 hover:border-r-4 border-yellow-400 cursor-pointer ${
                pathname.includes("/dashboard/logout") &&
                "text-yellow-400 border-r-4 border-yellow-400"
              }`}
            >
              <MdLogout fontSize={25} />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AdminSidebar;
