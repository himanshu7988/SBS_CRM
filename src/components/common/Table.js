import { Tooltip } from "@mui/material";
import React from "react";
import AddContactModal from "@/components/modals/AddContactModal";
import { IoIosSearch } from "react-icons/io";

const Table = ({ headCells, visibleRows }) => {
  return (
    <div className="w-full shadow-md">
      <div className=" px-4 py-4 flex items-center justify-between rounded-tl-lg rounded-tr-lg shadow-2xl bg-white">
        <h3 className="text-2xl font-semibold text-default "> Contact</h3>
        <div className="flex items-center gap-4">
          {/* <div className="bg-gray-100 rounded-full p-2 cursor-pointer"> */}
            <AddContactModal />
          {/* </div> */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-12 py-3 w-80 rounded-[2rem] focus:outline-none border-none bg-gray-100"
            />
            <span className="absolute top-1/2 left-1 p-2 rounded-full bg-purple-300 -translate-y-1/2">
              <IoIosSearch fontSize={23} />
            </span>
          </div>
        </div>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          {headCells.map((item) => (
            <th
              key={item.id}
              align={
                item?.align ? item?.align : item?.numeric ? "right" : "left"
              }
            >
              {item.label}
            </th>
          ))}
        </thead>
        <tbody>
          {visibleRows.map((item, i) => (
            <tr key={i}>
              <td>{item?.CompanyName}</td>
              <td>{item?.ContactPerson}</td>
              <td>{item?.Designation}</td>
              <td>{item?.ContactNo}</td>
              <td>{item?.Email}</td>
              <td>{item?.Addresss}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-0 border-t-0 border-black py-4 rounded-bl-lg rounded-br-lg shadow-2xl bg-white px-4">
        {/* <h3>Footer</h3> */}
      </div>
    </div>
  );
};

export default Table;
