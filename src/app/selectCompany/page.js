"use client";
import { GetCompanyListFinancialYear } from "@/config/Api";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHandPointDown } from "react-icons/fa";
import { toast } from "react-toastify";

const SelectCompany = () => {
  const router = useRouter();
  const [visibleRows, setVisibleRows] = useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const getFinancialYear = () => {
    const currentYear = parseInt(dayjs().format("YYYY"));
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear.toString().slice(-2)}`;
  };

  const getData = async () => {
    setError("");
    setLoading(true);
    await GetCompanyListFinancialYear({ financialYear: getFinancialYear() })
      .then((res) => {
        if (res?.data?.success) {
          setVisibleRows(res?.data?.data);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setError(err?.message);
        if (err.response?.data?.message) {
          return toast.error(err.response?.data?.message);
        }
        toast.error(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!loaded) {
      return setLoaded(true);
    }
    getData();
  }, [loaded]);

  return (
    <>
      <section className="min-h-screen bg-gray-100">
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
              {visibleRows.map((item, i) => (
                <Link
                  href={`/dashboard?financialYear=${item?._id}`}
                  className="bg-default text-white font-semibold text-3xl p-4 rounded-md flex flex-col gap-2 cursor-pointer capitalize"
                  onClick={() => router.push("/dashboard")} // Wrapped in a function
                  key={i + 1}
                >
                  {item?.company?.companyName}
                  <span className="text-lg font-normal">
                    {item?.financialYear}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectCompany;
