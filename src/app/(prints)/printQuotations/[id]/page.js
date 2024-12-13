"use client";

import Header from "@/components/print/Header";
import {
  BASE_URL_IMG,
  getPurchaseOrderById,
  GetQuotationById,
} from "@/config/Api";
import {
  formatIndianNumber,
  numberToWordsIndian,
} from "@/utils/GlobalFunctions";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }) {
  const printRef = useRef(null);
  const [state, setState] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handlePrint = (data) => {
    const printContent = printRef.current;

    if (!printContent) {
      console.error("Print content not found.");
      return;
    }

    // Save the original body content to restore later
    const originalBody = document.body.innerHTML;

    // Clone the content to print
    const printContentHtml = printContent.innerHTML;

    // Replace body content with the content we want to print
    document.body.innerHTML = `
      <html>
      <head>
        <title>${data?.voucherNo}</title>
        </head>
        <body class="!bg-white">
          ${printContentHtml}
        </body>
      </html>
    `;

    // Trigger the print
    // window.print();

    // Restore the original content after printing
    document.body.innerHTML = originalBody;
  };

  const getData = async () => {
    try {
      const myDataH = await GetQuotationById({ id: params?.id });

      if (myDataH.data.success) {
        setState(myDataH.data.data);
      }
      setTimeout(() => {
        handlePrint(myDataH.data.data);
      }, [2000]);
    } catch (err) {
      if (err?.response?.status == 401) {
        return toast.error("Unauthorized Request");
      }
    }
  };
  useEffect(() => {
    if (!loaded) {
      return setLoaded(true);
    }
    getData();
  }, [loaded]);
  return (
    <div className="min-h-screen py-5">
      <div className="mx-auto w-full max-w-6xl !bg-white !text-black">
        <div ref={printRef}>
          <div
            className="grid w-full grid-cols-11"
            // style={{ fontFamily: "times-new-roman" }}
          >
            <div className="col-span-11">
              <div>
                <Header voucherNo={state?.quotationNo} pfor="Quotation" />
                <div className="grid grid-cols-2 py-3">
                  <div className=" px-3 pr-5 py-1">
                    <h6 className="text-md font-bold mb-2">
                      Quotation Details:
                    </h6>
                    <p>
                      <span className="font-semibold">
                        Quotaion No. &nbsp;&nbsp;&nbsp;:{" "}
                      </span>
                      {state?.quotationNo}
                    </p>
                    <p>
                      <span className="font-semibold">Quotaion Date : </span>
                      {dayjs(state?.quotationDate).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 py-3">
                  <div className=" px-3 pr-5 py-1">
                    <h6 className="text-md font-bold">Company Details:</h6>
                    <p>
                      {state?.company.companyName}
                      <br />
                      {state?.company.addressLine1},
                      {state?.company.addressLine2},{state?.cityCompany.name},
                      {state?.stateCompany.name},{state?.countryCompany.name}
                      <br />
                      Contact Person: {state?.contactCompany.name}
                      <br />
                      Phone: {state?.contactCompany.phone}
                      <br />
                      Email: {state?.contactCompany.email}
                      <br />
                    </p>
                  </div>
                  <div className=" px-3 pr-5 py-1">
                    <h6 className="text-md font-bold">Client Details</h6>
                    <p>
                      {state?.client.companyName}
                      <br />
                      {state?.client.addressLine1},{state?.client.addressLine2},
                      {state?.cityClient.name},{state?.stateClient.name},
                      {state?.countryClient.name}
                      <br />
                      Contact Person: {state?.contactClient.name}
                      <br />
                      Phone: {state?.contactClient.phone}
                      <br />
                      Email: {state?.contactClient.email}
                      <br />
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-12 bg-gray-300 text-sm">
                  <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                    <span className="font-semibold">S.NO.</span>
                  </div>
                  <div className="col-span-5 border border-gray-400 px-3 py-1">
                    <span className="font-semibold">
                      ITEM/ SERVICE DESCRIPTION
                    </span>
                  </div>
                  <div className="col-span-6 grid grid-cols-4">
                    <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                      <span className="font-semibold">Quantity</span>
                    </div>
                    <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                      <span className="font-semibold">Unit Price</span>
                    </div>
                    <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                      <span className="font-semibold">Discount Price</span>
                    </div>
                    <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                      <span className="text-medium font-semibold">Total</span>
                    </div>
                  </div>
                </div>
                {state?.items.map((item, i) => (
                  <div
                    className="grid grid-cols-12 text-sm"
                    // style={{ fontSize: "1rem" }}
                    key={i + 1}
                  >
                    <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                      {i + 1}
                    </div>
                    <div className="col-span-5 border border-gray-400 px-3 py-1 whitespace-pre-wrap">
                      {item?.itemDesc}
                    </div>
                    <div className="col-span-6 grid grid-cols-4">
                      <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                        {item?.qty.toFixed(2)}
                      </div>
                      <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                        {formatIndianNumber(item?.unitPrice.toFixed(2))}
                      </div>
                      <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                        {formatIndianNumber(item?.discountPrice.toFixed(2))}
                      </div>
                      <div className="col-span-1 border border-gray-400 px-3 py-1 text-right">
                        {formatIndianNumber(
                          (
                            item?.qty * item?.unitPrice -
                            item?.discountPrice
                          ).toFixed(2)
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-12">
                  <div className="col-span-9 border border-gray-400 px-3 py-1 text-right">
                    <span className="text-medium font-semibold">TOTAL</span>
                  </div>
                  <div className="col-span-3 grid grid-cols-4 text-sm">
                    <div className="col-span-2 border border-gray-400 px-3 py-1 text-right">
                      <span className="font-semibold">
                        {formatIndianNumber(
                          state?.items.reduce((acc, obj) => {
                            const totalAmount = acc + obj?.discountPrice;
                            return totalAmount;
                          }, 0)
                        )}
                      </span>
                    </div>
                    <div className="col-span-2 border border-gray-400 px-3 py-1 text-right">
                      <span className="font-semibold">
                        {formatIndianNumber(
                          state?.items.reduce((acc, obj) => {
                            const totalAmount =
                              acc +
                              obj?.qty * obj?.unitPrice -
                              obj?.discountPrice;
                            return totalAmount;
                          }, 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-12 border border-gray-400 px-3 py-1">
                    <span className="font-semibold">AMOUNT IN WORDS</span> :
                    &nbsp;
                    <span className="capitalize">
                      {state?.items &&
                        numberToWordsIndian(
                          state?.items
                            .reduce((acc, obj) => {
                              const totalAmount =
                                acc +
                                obj?.qty * obj?.unitPrice -
                                obj?.discountPrice;
                              return totalAmount;
                            }, 0)
                            .toFixed(2)
                        )}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 py-5">
                  <div className="col-span-12 px-3 py-1">
                    <span className="font-semibold">TERMS AND CONDITIONS:</span>
                    <p className="whitespace-pre-wrap">{state?.TAndC}</p>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-4 px-3 py-1">
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="col-span-4 px-3 py-1">
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="col-span-4 px-3 py-1">
                    <br />
                    <br />
                    <br />
                    <br />
                    (Authorized Signatory)/Approved by
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
