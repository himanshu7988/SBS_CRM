"use client";

import { IconButton, TablePagination, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ItemModal from "@/components/modals/quotation/ItemModal";
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
import { DeleteLedger, GetLedgerList } from "@/config/Api";
import { toast } from "react-toastify";
import { GetActiveLabel } from "@/components/common/GlobalFunctions";
import { debounce } from "lodash";
import { MdMoreVert } from "react-icons/md";
import { useSearchParams } from "next/navigation";

const headCells = [
  {
    label: "Sr.",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Item/Service Description",
    //   align:"left",
    numeric: false,
  },
  {
    label: "Quantity",
    //   align:"right",
    numeric: true,
  },
  {
    label: "Unit Price",
    //   align:"left",
    numeric: true,
  },
  {
    label: "Discount Price",
    //   align:"left",
    numeric: true,
  },
  {
    label: "Total",
    //   align:"left",
    numeric: true,
  },
  {
    label: "Action",
    align: "center",
    // numeric: false,
  },
];

const QuotationTable = ({ formik }) => {
  const [page, setPage] = React.useState(0);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [formFor, setFormFor] = React.useState("Add");
  const [currentData, setCurrentData] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [isOpenAdd, setIsOpenAdd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  // const [visibleRows, setVisibleRows] = useState([]);
  const [searchData, setSearchData] = useState("");
  const searchPramas = useSearchParams();
  const financialYear = searchPramas.get("financialYear");

  const onOpen = () => {
    setIsOpenAdd(true);
  };
  const onEdit = (row, i) => {
    setFormFor("Update");
    setCurrentData(row);
    setCurrentIndex(i);
    setIsOpenAdd(true);
  };
  const onClose = () => {
    setFormFor("Add");
    setCurrentData(null);
    setCurrentIndex(null);
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
    formik.setFieldValue("items", formik.values.items.toSpliced(id, 1));
  };

  // const getData = async (text) => {
  //   setError("");
  //   setLoading(true);
  //   await GetLedgerList({
  //     financialYear: financialYear,
  //     page: page + 1,
  //     pageSize: rowsPerPage,
  //     search: text ? text : searchData,
  //   })
  //     .then((res) => {
  //       if (res?.data?.success) {
  //         setVisibleRows(res?.data?.data);
  //         setTotalRecords(res?.data?.pagination?.totalRecords);
  //       } else {
  //         toast.error(res?.data?.message);
  //       }
  //     })
  //     .catch((err) => {
  //       setError(err?.message);
  //       if (err.response?.data?.message) {
  //         return toast.error(err.response?.data?.message);
  //       }
  //       toast.error(err?.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const handleSearch = useCallback(
    debounce((value) => {
      getData(value);
    }, 500),
    []
  );

  // useEffect(() => {
  //   if (!loaded) {
  //     return setLoaded(true);
  //   }
  //   getData();
  // }, [loaded, searchData, page, rowsPerPage]);

  return (
    <>
      <div className="w-full">
        <div className=" py-4 flex items-center justify-between rounded-tl-lg rounded-tr-lg">
          <p className="font-semibold">Quotation Items</p>
          <div className="flex items-center gap-1 md:gap-4">
            {/* <div className="bg-gray-100 rounded-full p-2 cursor-pointer"> */}
            <Tooltip content="Add Contact">
              <IconButton onClick={onOpen}>
                <FaPlus fontSize={20} />
              </IconButton>
            </Tooltip>
            {/* </div> */}
          </div>
        </div>
        <hr className="col-span-2" />
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
                formik.values?.items.map((item, i) => (
                  <tr key={i}>
                    <td align="left" className="whitespace-nowrap">
                      {i + 1 + rowsPerPage * page}
                    </td>
                    <td align="left" className="whitespace-pre-wrap">
                      {item?.itemDesc}
                    </td>
                    <td align="right" className="whitespace-nowrap">
                      {item?.qty}
                    </td>
                    <td align="right" className="whitespace-nowrap">
                      {item?.unitPrice}
                    </td>
                    <td align="right" className="whitespace-nowrap">
                      {item?.discountPrice}
                    </td>
                    <td align="right" className="whitespace-nowrap">
                      {(
                        item?.qty * item?.unitPrice -
                        item?.discountPrice
                      ).toFixed(2)}
                    </td>
                    <td align="center" className="whitespace-nowrap">
                      <Tooltip arrow title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => {
                            onEdit(item, i);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => {
                            deleteData(i);
                          }}
                        >
                          <DeleteIcon
                            className="text-red-500"
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                      {/* <Dropdown>
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
                      </Dropdown> */}
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
        {!loading && !formik.values?.items.length && error == "" && (
          <p className="justify-center text-xl font-semibold py-10 bg-white flex gap-3">
            No Data Found.
          </p>
        )}
        {error !== "" && (
          <p className="justify-center text-xl font-semibold py-10 bg-white flex gap-3 text-red-500">
            {error} !
          </p>
        )}
        {/* <div className="border-0 border-t-0 border-black py-4 rounded-bl-lg rounded-br-lg bg-white px-4">
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
        </div> */}
      </div>
      <ItemModal
        formFor={formFor}
        currentData={currentData}
        currentIndex={currentIndex}
        isOpen={isOpenAdd}
        onClose={onClose}
        formik={formik}
      />
    </>
  );
};

export default QuotationTable;
