"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import AdminSidebar from "../AdminSidebar";
import BreadCrumb from "../BreadCrumbs";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        {pathname.includes("/adminDashboard") ? (
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        ) : (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/* Main Content Area */}
        <div className="relative flex-1 flex-col bg-gray-100 overflow-y-auto">
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content */}
          <main>
            <div className="mx-auto max-w-screen-2xl px-4 md:px-6 2xl:px-10 pt-2">
              <BreadCrumb />
            </div>
            <div className="mx-auto max-w-screen-2xl px-4 md:px-6 2xl:px-10 pt-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
