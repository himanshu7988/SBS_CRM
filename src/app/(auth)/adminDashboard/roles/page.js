"use client";

import { IconButton, TablePagination, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import RoleModal from "@/components/modals/RoleModal";
import { IoIosSearch } from "react-icons/io";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaPlus } from "react-icons/fa6";
import { Skeleton, Spinner } from "@nextui-org/react";
import { GetRoleList } from "@/config/Api";
import { toast } from "react-toastify";

const headCells = [
  {
    label: "Sr.",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Role Name",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Action",
    align: "center",
    // numeric: false,
  },
];

const Page = () => {
  const [page, setPage] = React.useState(0);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [formFor, setFormFor] = React.useState("Add");
  const [currentData, setCurrentData] = React.useState(null);
  const [isOpenAdd, setIsOpenAdd] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [visibleRows, setVisibleRows] = useState([]);
  const [searchData, setSearchData] = useState("");

  const onOpen = () => {
    setIsOpenAdd(true);
  };
  const onEdit = (row) => {
    setFormFor("Update");
    setCurrentData(row);
    setIsOpenAdd(true);
  };
  const onClose = () => {
    setFormFor("Add");
    setCurrentData(null);
    setIsOpenAdd(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = async () => {
    await GetRoleList({
      page: page + 1,
      pageSize: rowsPerPage,
      search: searchData,
    })
      .then((res) => {
        if (res?.data?.success) {
          setVisibleRows(res?.data?.data);
          setTotalRecords(res?.data?.pagination?.totalRecords);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          return toast.error(err.response?.data?.message);
        }
        toast.error(err?.message);
      });
  };

  useEffect(() => {
    if (!loaded) {
      return setLoaded(true);
    }
    getData();
  }, [loaded, searchData]);

  return (
    <>
      <div className="w-full shadow-md">
        <div className=" px-4 py-4 flex items-center justify-between rounded-tl-lg rounded-tr-lg shadow-2xl bg-white">
          <h3 className="text-lg md:text-2xl font-semibold text-default ">
            {" "}
            Roles
          </h3>
          <div className="flex items-center gap-1 md:gap-4">
            {/* <div className="bg-gray-100 rounded-full p-2 cursor-pointer"> */}
            <Tooltip content="Add Contact">
              <IconButton onClick={onOpen}>
                <FaPlus fontSize={20} />
              </IconButton>
            </Tooltip>
            {/* </div> */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="px-8 md:px-12 py-1 md:py-3 w-40 md:w-[17rem] rounded-[2rem] focus:outline-none border-none bg-gray-100"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
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
                {headCells.map((item, i) => (
                  <th
                    key={i + 1}
                    align={
                      item?.align
                        ? item?.align
                        : item?.numeric
                        ? "right"
                        : "left"
                    }
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading &&
                visibleRows.map((item, i) => (
                  <tr key={i}>
                    <td align="left">{i + 1}</td>
                    <td align="left">{item?.roleName}</td>
                    <td align="center">
                      <Tooltip arrow title="Edit">
                        <IconButton
                          aria-label="Edit"
                          size="small"
                          onClick={() => {}}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title="Delete">
                        <IconButton
                          aria-label="View"
                          size="small"
                          onClick={() => {}}
                        >
                          <DeleteIcon
                            className="text-red-500"
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <p className="justify-center text-xl font-semibold py-10 bg-white flex gap-3">
            <Spinner color="secondary" />
            Loading.....
          </p>
        )}
        {!loading && !visibleRows.length && (
          <p className="justify-center text-xl font-semibold py-10 bg-white flex gap-3">
            No Data Found.
          </p>
        )}
        <div className="border-0 border-t-0 border-black py-4 rounded-bl-lg rounded-br-lg shadow-2xl bg-white px-4">
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 30]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count, page }) =>
              `Page: ${page + 1} | ${from}-${to} of ${
                count !== -1 ? count : `more than ${to}`
              }`
            }
          />
        </div>
      </div>
      <RoleModal
        formFor={formFor}
        currentData={currentData}
        isOpen={isOpenAdd}
        onClose={onClose}
        setLoaded={setLoaded}
      />
    </>
  );
};

export default Page;
