import React from "react";
import Chart from "@/components/Chart";
import PieChart from "@/components/PieChart";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="p-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col gap-2 text-white shadow-xl">
          <p className="text-3xl font-light">Total Users</p>
          <span className="text-4xl font-semibold"> 10,000 </span>
        </div>
        <div className="p-8 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex flex-col gap-2 text-white shadow-xl">
          <p className="text-3xl font-light">Active Today</p>
          <span className="text-4xl font-semibold"> 9,600</span>
        </div>
        <div className="p-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col gap-2 text-white shadow-xl">
          <p className="text-3xl font-light">Inactive Today</p>
          <span className="text-4xl font-semibold"> 1,400</span>
        </div>
      </div>
      <div className="py-16 flex flex-col md:flex-row gap-4 items-center justify-center">
        <Chart />
        {/* <PieChart/> */}
      </div>
    </>
  );
};

export default page;
