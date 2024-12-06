"use client";

import MyInput from "@/components/common/Input";
import QuotationTable from "@/components/table/QuotationTable";
import { Button } from "@nextui-org/react";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-2 gap-3 relative">
      <div className="col-span-2 bg-default py-2 px-5 !sticky top-20 md:top-24 z-10 flex justify-end">
        <div className="flex gap-2">
          <Button
            type="reset"
            className="bg-red-500 text-white font-semibold"
            size="sm"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-white text-default font-semibold"
            size="sm"
          >
            Save
          </Button>
        </div>
      </div>
      <div className="col-span-2 grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-3 gap-3">
        <div className="col-span-3 flex justify-between">
          <p className="font-semibold">Quotation Details</p>
        </div>
        <hr className="col-span-3" />
        <div>
          <MyInput
            htmlFor="quotationNo"
            id="quotationNo"
            name="quotationNo"
            type="text"
            label="Quotation No"
            // onChange={formik.handleChange}
            // value={formik.values.quotationNo}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.quotationNo &&
            //   formik.errors.quotationNo
            //     ? formik.errors.quotationNo
            //     : ""
            // }
          />
        </div>
        <div>
          <MyInput
            htmlFor="date"
            id="date"
            name="date"
            type="text"
            label="Date"
            // onChange={formik.handleChange}
            // value={formik.values.date}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.date &&
            //   formik.errors.date
            //     ? formik.errors.date
            //     : ""
            // }
          />
        </div>
        <div>
          <MyInput
            htmlFor="validUntil"
            id="validUntil"
            name="validUntil"
            type="text"
            label="Valid Until"
            // onChange={formik.handleChange}
            // value={formik.values.validUntil}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.validUntil &&
            //   formik.errors.validUntil
            //     ? formik.errors.validUntil
            //     : ""
            // }
          />
        </div>
      </div>
      <div className="grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2 flex justify-between">
          <p className="font-semibold">Company Details</p>
          <p>
            <span className="font-semibold">GST : </span>121212
          </p>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
      </div>
      <div className="grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2 flex justify-between">
          <p className="font-semibold">Company Details</p>
          <p>
            <span className="font-semibold">GST : </span>121212
          </p>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="openingAmount"
            id="openingAmount"
            name="openingAmount"
            type="text"
            label="Opening Amount"
            // onChange={formik.handleChange}
            // value={formik.values.openingAmount}
            // onBlur={formik.handleBlur}
            // error={
            //   formik.touched.openingAmount &&
            //   formik.errors.openingAmount
            //     ? formik.errors.openingAmount
            //     : ""
            // }
          />
        </div>
      </div>
      <div className="col-span-2 grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2 flex justify-between">
          <p className="font-semibold">Quotation Items</p>
          <p>
            <span className="font-semibold">GST : </span>121212
          </p>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
            <QuotationTable />
        </div>
      </div>
    </div>
  );
};

export default page;
