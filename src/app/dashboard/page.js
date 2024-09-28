import React from "react";
import Chart from "@/components/Chart"

const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="p-8 rounded-lg bg-default flex flex-col gap-2 text-white">
          <p className="text-3xl font-light">Total Contacts</p>
          <span className="text-4xl font-semibold"> 10,000 </span>
        </div>
        <div className="p-8 rounded-lg bg-default flex flex-col gap-2 text-white">
          <p className="text-3xl font-light">Verified Contact</p>
          <span className="text-4xl font-semibold"> 9,600</span>
        </div>
        <div className="p-8 rounded-lg bg-default flex flex-col gap-2 text-white">
          <p className="text-3xl font-light">New Contacts</p>
          <span className="text-4xl font-semibold"> 1,400</span>
        </div>
      </div>
      <div className="mt-12">
        <Chart/>
      </div>
    </>
  );
};

export default page;
