"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaHandPointDown } from "react-icons/fa";

const SelectCompany = () => {
  const router = useRouter();

  return (
    <>
      <section className="h-screen bg-gray-100">
        <div className="flex flex-col gap-4 max-w-7xl mx-auto p-5 h-full">
          <div className="flex flex-row items-center justify-between">
            <Image
              width={146}
              height={15}
              src={"/images/linkup.png"}
              alt="Logo"
            />
            <div className="flex gap-3">
              <Button
                className="text-white bg-default font-medium"
                onClick={() => router.push("/adminDashboard")}
              >
                Admin Dashboard
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold text-default flex items-center justify-center gap-2">
              Select Company <FaHandPointDown />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24">
              <div
                className="bg-default text-white font-semibold text-3xl p-4 rounded-md flex flex-col gap-2 cursor-pointer"
                onClick={() => router.push("/dashboard")} // Wrapped in a function
              >
                SBS Digital Infotech
                <span className="text-lg font-normal">2024 - 2025</span>
              </div>
              <div
                className="bg-default text-white font-semibold text-3xl p-4 rounded-md flex flex-col gap-2 cursor-pointer"
                onClick={() => router.push("/dashboard")} // Wrapped in a function
              >
                Pipe and Section
                <span className="text-lg font-normal">2024 - 2025</span>
              </div>
              <div
                className="bg-default text-white font-semibold text-3xl p-4 rounded-md flex flex-col gap-2 cursor-pointer"
                onClick={() => router.push("/dashboard")} // Wrapped in a function
              >
                Pioneer
                <span className="text-lg font-normal">2024 - 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectCompany;
