import Table from "@/components/common/Table";
import React from "react";

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

const page = () => {
  return (
    <div className="mt-4 md:mt-8">
      <Table headCells={headCells} visibleRows={visibleRows} />
    </div>
  );
};

export default page;
