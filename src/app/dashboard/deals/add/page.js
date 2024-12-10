"use client";

import MyInput from "@/components/common/Input";
import MyAutocomplete from "@/components/common/MyAutocomplete";
import QuotationTable from "@/components/table/QuotationTable";
import { addLedgerSchema } from "@/models/ValidationSchemas";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";

const initialValues = {
  // international: false,
};
const Page = () => {
  const [ledgerData, setLedgerData] = useState([]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addLedgerSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      const resolveWithSomeData = new Promise(async (resolve, reject) => {
        await CreateLeader({
          ...values,
          crDr: values.crDr?.type,
          city: values.city?.id,
          state: values.state?.id,
          country: values.country?.id,
          financialYear: financialYear,
        })
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
          })
          .finally(() => {
            formik.setSubmitting(false);
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
    },
  });

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
          <MyAutocomplete
            label="Company"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.company}
            onChange={(e, newValue) => {
              formik.setFieldValue("company", newValue);
            }}
            error={
              formik.touched.company && formik.errors.company
                ? formik.errors.company
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "company",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="Country"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.country}
            onChange={(e, newValue) => {
              formik.setFieldValue("country", newValue);
            }}
            error={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "country",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="State/Provence"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.state}
            onChange={(e, newValue) => {
              formik.setFieldValue("state", newValue);
            }}
            error={
              formik.touched.state && formik.errors.state
                ? formik.errors.state
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "state",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="City"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.city}
            onChange={(e, newValue) => {
              formik.setFieldValue("city", newValue);
            }}
            error={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "city",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine1"
            id="addressLine1"
            name="addressLine1"
            type="text"
            label="Address Line 1"
            onChange={formik.handleChange}
            value={formik.values.addressLine1}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine1 && formik.errors.addressLine1
                ? formik.errors.addressLine1
                : ""
            }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine2"
            id="addressLine2"
            name="addressLine2"
            type="text"
            label="Address Line 2"
            onChange={formik.handleChange}
            value={formik.values.addressLine2}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine2 && formik.errors.addressLine2
                ? formik.errors.addressLine2
                : ""
            }
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="Contact"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.contact}
            onChange={(e, newValue) => {
              formik.setFieldValue("contact", newValue);
            }}
            error={
              formik.touched.contact && formik.errors.contact
                ? formik.errors.contact
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "contact",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="email"
            id="email"
            name="email"
            type="text"
            label="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="phone"
            id="phone"
            name="phone"
            type="text"
            label="Phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""
            }
          />
        </div>
      </div>
      <div className="grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2 flex justify-between">
          <p className="font-semibold">Client Details</p>
          <p>
            <span className="font-semibold">GST : </span>121212
          </p>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
          <MyAutocomplete
            label="Company"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.company}
            onChange={(e, newValue) => {
              formik.setFieldValue("company", newValue);
            }}
            error={
              formik.touched.company && formik.errors.company
                ? formik.errors.company
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "company",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="Country"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.country}
            onChange={(e, newValue) => {
              formik.setFieldValue("country", newValue);
            }}
            error={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "country",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="State/Provence"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.state}
            onChange={(e, newValue) => {
              formik.setFieldValue("state", newValue);
            }}
            error={
              formik.touched.state && formik.errors.state
                ? formik.errors.state
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "state",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="City"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.city}
            onChange={(e, newValue) => {
              formik.setFieldValue("city", newValue);
            }}
            error={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "city",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine1"
            id="addressLine1"
            name="addressLine1"
            type="text"
            label="Address Line 1"
            onChange={formik.handleChange}
            value={formik.values.addressLine1}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine1 && formik.errors.addressLine1
                ? formik.errors.addressLine1
                : ""
            }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine2"
            id="addressLine2"
            name="addressLine2"
            type="text"
            label="Address Line 2"
            onChange={formik.handleChange}
            value={formik.values.addressLine2}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine2 && formik.errors.addressLine2
                ? formik.errors.addressLine2
                : ""
            }
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="Contact"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            options={ledgerData}
            value={formik.values?.contact}
            onChange={(e, newValue) => {
              formik.setFieldValue("contact", newValue);
            }}
            error={
              formik.touched.contact && formik.errors.contact
                ? formik.errors.contact
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "contact",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="email"
            id="email"
            name="email"
            type="text"
            label="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="phone"
            id="phone"
            name="phone"
            type="text"
            label="Phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""
            }
          />
        </div>
      </div>
      <div className="col-span-2 grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2">
          {/* <QuotationTable /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
