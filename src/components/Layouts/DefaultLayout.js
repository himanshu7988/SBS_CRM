"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import AdminSidebar from "../AdminSidebar";

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
          <main className="">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
