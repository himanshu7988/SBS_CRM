import { Tooltip } from "@mui/material";
import React from "react";
import AddContactModal from "@/components/modals/AddContactModal";
import { IoIosSearch } from "react-icons/io";

const headCells = [
  {
    id: "haed_1",
    label: "Company Name",
    //   align:"left",
    numeric: false,
  },
  {
    id: "haed_2",
    label: "Contact Person",
    //   align:"right",
    numeric: false,
  },
  {
    id: "haed_3",
    label: "Designation",
    //   align:"left",
    numeric: false,
  },
  {
    id: "haed_4",
    label: "Contact No",
    //   align:"left",
    numeric: false,
  },
  {
    id: "haed_5",
    label: "E-mail",
    //   align:"left",
    numeric: false,
  },
  {
    id: "haed_6",
    label: "Addresss",
    //   align:"left",
    numeric: false,
  },
];

const visibleRows = [
  {
    CompanyName: "Pioneer Automation",
    ContactPerson: "Brijesh Sharma",
    Designation: "General Manager",
    ContactNo: "+91 84858487",
    Email: "pioneer123@gmail.com",
    Addresss: "Loni Industrial Area",
  },
  {
    CompanyName: "Trippy one",
    ContactPerson: "Miss Riddhi Sharma",
    Designation: "Employee",
    ContactNo: "+91 678584444",
    Email: "trippyone@gmail.com",
    Addresss: "Delhi industrial Area",
  },
  {
    CompanyName: "Canvas Exhibits",
    ContactPerson: "Mr. Sagar Batla",
    Designation: "Team Lead",
    ContactNo: "+91 698584494",
    Email: "Canvas.exhibits@gmail.com",
    Addresss: "Ghaziabad",
  },
  {
    CompanyName: "Trigo India",
    ContactPerson: "Pankaj Soni",
    Designation: "CEO",
    ContactNo: "+91 99858484",
    Email: "trigo001@gmail.com",
    Addresss: "Delhi",
  },
];

const Table = () => {
  return (
    <div className="w-full shadow-md">
      <div className=" px-4 py-4 flex items-center justify-between rounded-tl-lg rounded-tr-lg shadow-2xl bg-white">
        <h3 className="text-lg md:text-2xl font-semibold text-default "> Contact</h3>
        <div className="flex items-center gap-1 md:gap-4">
          {/* <div className="bg-gray-100 rounded-full p-2 cursor-pointer"> */}
          <AddContactModal />
          {/* </div> */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-8 md:px-12 py-1 md:py-3 w-40 md:w-[17rem] rounded-[2rem] focus:outline-none border-none bg-gray-100"
            />
            <span className="absolute top-1/2 left-1 p-1 md:p-2 rounded-full bg-purple-300 -translate-y-1/2">
              <IoIosSearch className="text-md md:text-xl" />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto scroll-my-1 w-full">
        <table className="w-full">
          <thead>
            <tr>
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
            </tr>
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
      </div>
      <div className="border-0 border-t-0 border-black py-4 rounded-bl-lg rounded-br-lg shadow-2xl bg-white px-4">
        {/* <h3>Footer</h3> */}
      </div>
    </div>
  );
};

export default Table;
