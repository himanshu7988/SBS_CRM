"use client";

import { IconButton, TablePagination, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CompanyModal from "@/components/modals/CompanyModal";
import { IoIosSearch } from "react-icons/io";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaPlus } from "react-icons/fa6";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { DeleteUser, GetCompanyList, UpdateUser } from "@/config/Api";
import { toast } from "react-toastify";
import { GetActiveLabel } from "@/components/common/GlobalFunctions";
import { debounce } from "lodash";
import { MdMoreVert } from "react-icons/md";

const headCells = [
  {
    label: "Sr.",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Name",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Started",
    // align: "center",
    numeric: false,
  },
  {
    label: "Email",
    // align: "center",
    numeric: false,
  },
  {
    label: "Pan",
    // align: "center",
    numeric: false,
  },
  {
    label: "Gst",
    // align: "center",
    numeric: false,
  },
  {
    label: "Billing Address",
    align: "left",
    // numeric: false,
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
  const [error, setError] = React.useState("");
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
  const onReset = (row) => {
    setFormFor("resetPass");
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

  const deleteData = async (id) => {
    const resolveWithSomeData = new Promise(async (resolve, reject) => {
      await DeleteUser(id)
        .then((res) => {
          if (res.data.success) {
            resolve(res.data.message);
            setLoaded(false);
            onClose();
          } else {
            reject(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response?.data?.message) {
            return reject(err.response?.data?.message);
          }
          reject(err.message);
        });
    });
    toast.promise(resolveWithSomeData, {
      pending: {
        render() {
          return "Deleting...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return `${data}`;
        },
      },
    });
  };

  const changeStatus = (id, status) => {
    const resolveWithSomeData = new Promise(async (resolve, reject) => {
      await UpdateUser(id, {
        isActive: status,
      })
        .then((res) => {
          if (res.data.success) {
            resolve(res.data.message);
            setLoaded(false);
          } else {
            reject(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response?.data?.message) {
            return reject(err.response?.data?.message);
          }
          reject(err.message);
        });
    });

    toast.promise(resolveWithSomeData, {
      pending: {
        render() {
          return "Saving...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return `${data}`;
        },
      },
    });
  };

  const getData = async (text) => {
    setError("");
    setLoading(true);
    await GetCompanyList({
      page: page + 1,
      pageSize: rowsPerPage,
      search: text ? text : searchData,
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

  const handleSearch = useCallback(
    debounce((value) => {
      getData(value);
    }, 500),
    []
  );

  useEffect(() => {
    if (!loaded) {
      return setLoaded(true);
    }
    getData();
  }, [loaded, searchData, page, rowsPerPage]);

  return (
    <>
      <div className="w-full shadow-md">
        <div className=" px-4 py-4 flex items-center justify-between rounded-tl-lg rounded-tr-lg shadow-2xl bg-white">
          <h3 className="text-lg md:text-2xl font-semibold text-default ">
            Companies
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
                onChange={(e) => {
                  setSearchData(e.target.value);
                  // handleSearch(e.target.value);
                }}
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
                    <td align="left">{i + 1 + rowsPerPage * page}</td>
                    <td align="left">{item?.companyName}</td>
                    <td align="left">{item?.beginYear}</td>
                    <td align="left">{item?.email}</td>
                    <td align="left">{item?.pan}</td>
                    <td align="left">{item?.gst}</td>
                    <td align="left">{item?.billingAddress}</td>
                    <td align="center">
                      <Tooltip arrow title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => {
                            onEdit(item);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => {
                            deleteData(item?._id);
                          }}
                        >
                          <DeleteIcon
                            className="text-red-500"
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                      <Dropdown>
                        <DropdownTrigger>
                          <Tooltip arrow title="Delete">
                            <IconButton variant="bordered">
                              <MdMoreVert />
                            </IconButton>
                          </Tooltip>
                        </DropdownTrigger>
                        <DropdownMenu
                          variant="faded"
                          aria-label="Dropdown menu with icons"
                        >
                          <DropdownItem
                            key="new"
                            // shortcut="⌘N"
                            // startContent={<AddNoteIcon className={iconClasses} />}
                            onClick={() => {
                              onReset(item);
                            }}
                          >
                            Reset Password
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
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
        {!loading && !visibleRows.length && error == "" && (
          <p className="justify-center text-xl font-semibold py-10 bg-white flex gap-3">
            No Data Found.
          </p>
        )}
        {error !== "" && (
          <p className="justify-center text-xl font-semibold py-10 bg-white flex gap-3 text-red-500">
            {error} !
          </p>
        )}
        <div className="border-0 border-t-0 border-black py-4 rounded-bl-lg rounded-br-lg shadow-2xl bg-white px-4">
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 50]}
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
      <CompanyModal
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
