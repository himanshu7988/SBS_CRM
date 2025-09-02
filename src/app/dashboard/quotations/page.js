"use client";

import { IconButton, TablePagination, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AddLedgerModal from "@/components/modals/AddLedgerModal";
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
import { BASE_URL_MY, DeleteLedger, GetQuotationList } from "@/config/Api";
import { toast } from "react-toastify";
import { GetActiveLabel } from "@/components/common/GlobalFunctions";
import { debounce } from "lodash";
import { MdMoreVert } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import { formatIndianNumber } from "@/utils/GlobalFunctions";
import PrintIcon from '@mui/icons-material/Print';

const headCells = [
  {
    label: "Sr.",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Quotation No.",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Quotation Date",
    //   align:"right",
    numeric: false,
  },
  {
    label: "Client",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Contact Person",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Phone",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Email",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Amount",
    //   align:"left",
    numeric: true,
  },
  {
    label: "Action",
    align: "center",
    // numeric: false,
  },
];

const Page = () => {
  const router = useRouter();
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
  const searchPramas = useSearchParams();
  const financialYear = searchPramas.get("financialYear");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteData = async (id) => {
    const resolveWithSomeData = new Promise(async (resolve, reject) => {
      await DeleteLedger(id)
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

  const getData = async (text) => {
    setError("");
    setLoading(true);
    await GetQuotationList({
      financialYear: financialYear,
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
            Quotation
          </h3>
          <div className="flex items-center gap-1 md:gap-4">
            {/* <div className="bg-gray-100 rounded-full p-2 cursor-pointer"> */}
            <Tooltip content="Add Contact">
              <Link href={`quotations/add?financialYear=${financialYear}`}>
                <IconButton>
                  <FaPlus fontSize={20} />
                </IconButton>
              </Link>
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
                    <td align="left" className="whitespace-nowrap">
                      {i + 1 + rowsPerPage * page}
                    </td>
                    <td align="left" className="whitespace-nowrap">
                      {item?.quotationNo}
                    </td>
                    <td align="left" className="whitespace-nowrap">
                      {dayjs(item?.quotationDate).format("DD-MM-YYYY")}
                    </td>
                    <td align="left">{item?.client?.companyName}</td>
                    <td align="left">{item?.contactClient?.name}</td>
                    <td align="left" className="whitespace-nowrap">
                      {item?.contactClient?.phone}
                    </td>
                    <td align="left" className="whitespace-nowrap">
                      {item?.contactClient?.email}
                    </td>
                    <td align="right">
                      {formatIndianNumber(
                        item?.items.reduce((acc, current) => {
                          return (
                            acc +
                            current?.qty * current?.unitPrice -
                            current?.discountPrice
                          );
                        }, 0)
                      )}
                    </td>
                    <td align="center" className="whitespace-nowrap">
                      <Tooltip arrow title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => {
                            router.push(
                              `quotations/${item?._id}?financialYear=${financialYear}`
                            );
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
                          <Tooltip arrow title="More">
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
                            startContent={<PrintIcon />}
                            onClick={() => {
                              window.open(
                                `${BASE_URL_MY}/printQuotations/${item?._id}`,
                                `_blank${item?._id}`,
                                "noopener,noreferrer",
                              )
                            }}
                          >
                            Print
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
    </>
  );
};

export default Page;
