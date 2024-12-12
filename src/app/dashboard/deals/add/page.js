"use client";

import MyInput from "@/components/common/Input";
import MyAutocomplete from "@/components/common/MyAutocomplete";
import QuotationTable from "@/components/table/QuotationTable";
import { addLedgerSchema } from "@/models/ValidationSchemas";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DateInput from "@/components/common/DateInput";
import dayjs from "dayjs";
import {
  getCityList,
  GetContactList,
  getCountriesList,
  GetLedgerList,
  getStatesList,
} from "@/config/Api";
import { useSearchParams } from "next/navigation";

const initialValues = {
  quotationNo: "",
  quotationDate: dayjs(),
  company: null,
  countryCompany: null,
  stateCompany: null,
  cityCompany: null,
  addressLine1Company: "",
  addressLine2Company: "",
  contactCompany: null,
  client: null,
  countryClient: null,
  stateClient: null,
  cityClient: null,
  addressLine1Client: "",
  addressLine2Client: "",
  contactClient: null,

  items: [],

  TAndC: "",
};
const Page = () => {
  const [loaded, setLoaded] = useState(false);
  const [ledgerData, setLedgerData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [stateDataCompany, setStateDataCompany] = useState([]);
  const [stateDataClient, setStateDataClient] = useState([]);
  const [cityDataCompany, setCityDataCompany] = useState([]);
  const [cityDataClient, setCityDataClient] = useState([]);
  const [contactDataCompany, setContactDataCompany] = useState([]);
  const [contactDataClient, setContactDataClient] = useState([]);
  const searchPramas = useSearchParams();
  const financialYear = searchPramas.get("financialYear");

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

  const getData = async () => {
    try {
      const [resLedger, resCountry] = await Promise.all([
        GetLedgerList({ financialYear, search: "" }),
        getCountriesList(),
      ]);
      if (resLedger) {
        setLedgerData(resLedger?.data?.data);
      }
      if (resCountry) {
        setCountryData(resCountry?.data?.data);
      }
    } catch (error) {}
  };

  const getState = async (id, rFor) => {
    try {
      const resState = await getStatesList({ id });
      if (resState) {
        if (rFor == "Company") {
          setStateDataCompany(resState?.data?.data);
        } else {
          setStateDataClient(resState?.data?.data);
        }
      }
    } catch (error) {}
  };
  const getCity = async (id, rFor) => {
    try {
      const resCity = await getCityList({ id });
      if (resCity) {
        if (rFor == "Company") {
          setCityDataCompany(resCity?.data?.data);
        } else {
          setCityDataClient(resCity?.data?.data);
        }
      }
    } catch (error) {}
  };
  const getContact = async (id, rFor) => {
    try {
      const resContact = await GetContactList({
        financialYear,
        search: "",
        ledger: id,
      });
      if (resContact) {
        if (rFor == "Company") {
          setContactDataCompany(resContact?.data?.data);
        } else {
          setContactDataClient(resContact?.data?.data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!formik.values.company) {
      setContactDataCompany([]);
    } else {
      getContact(formik.values.company?._id, "Company");
    }
  }, [formik.values.company]);
  useEffect(() => {
    if (!formik.values.client) {
      setContactDataClient([]);
    } else {
      getContact(formik.values.client?._id, "Client");
    }
  }, [formik.values.client]);

  useEffect(() => {
    if (!formik.values.countryCompany) {
      setStateDataCompany([]);
      setCityDataCompany([]);
    } else {
      getState(formik.values.countryCompany?.id, "Company");
    }
  }, [formik.values.countryCompany]);
  useEffect(() => {
    if (!formik.values.countryClient) {
      setStateDataClient([]);
      setCityDataClient([]);
    } else {
      getState(formik.values.countryClient?.id, "Client");
    }
  }, [formik.values.countryClient]);

  useEffect(() => {
    if (!formik.values.stateCompany) {
      setCityDataCompany([]);
    } else {
      getCity(formik.values.stateCompany?.id, "Company");
    }
  }, [formik.values.stateCompany]);
  useEffect(() => {
    if (!formik.values.stateClient) {
      setCityDataClient([]);
    } else {
      getCity(formik.values.stateClient?.id, "Client");
    }
  }, [formik.values.stateClient]);

  useEffect(() => {
    if (formik.values.company) {
      formik.setValues({
        ...formik.values,
        countryCompany: formik.values.company?.country,
        stateCompany: formik.values.company?.state,
        cityCompany: formik.values.company?.city,
        addressLine1Company: formik.values.company?.addressLine1,
        addressLine2Company: formik.values.company?.addressLine2,
      });
    } else {
      formik.setValues({
        ...formik.values,
        countryCompany: null,
        stateCompany: null,
        cityCompany: null,
        addressLine1Company: "",
        addressLine2Company: "",
      });
    }
  }, [formik.values.company]);

  useEffect(() => {
    if (formik.values.client) {
      formik.setValues({
        ...formik.values,
        countryClient: formik.values.client?.country,
        stateClient: formik.values.client?.state,
        cityClient: formik.values.client?.city,
        addressLine1Client: formik.values.client?.addressLine1,
        addressLine2Client: formik.values.client?.addressLine2,
      });
    } else {
      formik.setValues({
        ...formik.values,
        countryClient: null,
        stateClient: null,
        cityClient: null,
        addressLine1Client: "",
        addressLine2Client: "",
      });
    }
  }, [formik.values.client]);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
    getData();
  }, [loaded]);

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
            disabled
          />
        </div>
        <div>
          <DateInput
            label="Quotation Date"
            value={formik.values.quotationDate}
            onChange={(newValue) =>
              formik.setFieldValue("quotationDate", newValue)
            }
            maxDate={dayjs()}
            // openTo="year"
            // views={["year"]}
            onBlur={formik.handleBlur}
            error={
              formik.touched.quotationDate &&
              Boolean(formik.errors.quotationDate)
                ? formik.errors.quotationDate
                : ""
            }
            disabled
          />
        </div>
        {/* <div>
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
        </div> */}
      </div>
      <div className="grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2 flex justify-between">
          <p className="font-semibold">Company Details</p>
          <p>
            <span className="font-semibold">GST : </span>{" "}
            {formik.values?.company?.gst}
          </p>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
          <MyAutocomplete
            label="Company"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.companyName}
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
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={countryData}
            value={formik.values?.countryCompany}
            onChange={(e, newValue) => {
              formik.setValues({
                ...formik.values,
                countryCompany: newValue,
                stateCompany: null,
                cityCompany: null,
              });
            }}
            error={
              formik.touched.countryCompany && formik.errors.countryCompany
                ? formik.errors.countryCompany
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "countryCompany",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="State/Provence"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={stateDataCompany}
            value={formik.values?.stateCompany}
            onChange={(e, newValue) => {
              formik.setValues({
                ...formik.values,
                stateCompany: newValue,
                cityCompany: null,
              });
            }}
            error={
              formik.touched.stateCompany && formik.errors.stateCompany
                ? formik.errors.stateCompany
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "stateCompany",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="City"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={cityDataCompany}
            value={formik.values?.cityCompany}
            onChange={(e, newValue) => {
              formik.setValues({
                ...formik.values,
                cityCompany: newValue,
              });
            }}
            error={
              formik.touched.cityCompany && formik.errors.cityCompany
                ? formik.errors.cityCompany
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "cityCompany",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine1Company"
            id="addressLine1Company"
            name="addressLine1Company"
            type="text"
            label="Address Line 1"
            onChange={formik.handleChange}
            value={formik.values.addressLine1Company}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine1Company &&
              formik.errors.addressLine1Company
                ? formik.errors.addressLine1Company
                : ""
            }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine2Company"
            id="addressLine2Company"
            name="addressLine2Company"
            type="text"
            label="Address Line 2"
            onChange={formik.handleChange}
            value={formik.values.addressLine2Company}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine2Company &&
              formik.errors.addressLine2Company
                ? formik.errors.addressLine2Company
                : ""
            }
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="Contact"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={contactDataCompany}
            value={formik.values?.contactCompany}
            onChange={(e, newValue) => {
              formik.setFieldValue("contactCompany", newValue);
            }}
            error={
              formik.touched.contactCompany && formik.errors.contactCompany
                ? formik.errors.contactCompany
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "contactCompany",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="emailCompany"
            id="emailCompany"
            name="emailCompany"
            type="text"
            label="Email"
            onChange={formik.handleChange}
            value={
              formik.values?.contactCompany?.email
                ? formik.values?.contactCompany?.email
                : ""
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailCompany && formik.errors.emailCompany
                ? formik.errors.emailCompany
                : ""
            }
            disabled
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="phoneCompany"
            id="phoneCompany"
            name="phoneCompany"
            type="text"
            label="Phone"
            onChange={formik.handleChange}
            value={
              formik.values.contactCompany?.phone
                ? formik.values.contactCompany?.phone
                : ""
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneCompany && formik.errors.phoneCompany
                ? formik.errors.phoneCompany
                : ""
            }
            disabled
          />
        </div>
      </div>
      <div className="grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2 flex justify-between">
          <p className="font-semibold">Client Details</p>
          <p>
            <span className="font-semibold">GST : </span>{" "}
            {formik.values?.client?.gst}
          </p>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
          <MyAutocomplete
            label="Company"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.companyName}
            options={ledgerData}
            value={formik.values?.client}
            onChange={(e, newValue) => {
              formik.setFieldValue("client", newValue);
            }}
            error={
              formik.touched.client && formik.errors.client
                ? formik.errors.client
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "client",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="Country"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={countryData}
            value={formik.values?.countryClient}
            onChange={(e, newValue) => {
              formik.setValues({
                ...formik.values,
                countryClient: newValue,
                stateClient: null,
                cityClient: null,
              });
            }}
            error={
              formik.touched.countryClient && formik.errors.countryClient
                ? formik.errors.countryClient
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "countryClient",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="State/Provence"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={stateDataClient}
            value={formik.values?.stateClient}
            onChange={(e, newValue) => {
              formik.setValues({
                ...formik.values,
                stateClient: newValue,
                cityClient: null,
              });
            }}
            error={
              formik.touched.stateClient && formik.errors.stateClient
                ? formik.errors.stateClient
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "stateClient",
            }}
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="City"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={cityDataClient}
            value={formik.values?.cityClient}
            onChange={(e, newValue) => {
              formik.setValues({
                ...formik.values,
                cityClient: null,
              });
            }}
            error={
              formik.touched.cityClient && formik.errors.cityClient
                ? formik.errors.cityClient
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "cityClient",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine1Client"
            id="addressLine1Client"
            name="addressLine1Client"
            type="text"
            label="Address Line 1"
            onChange={formik.handleChange}
            value={formik.values.addressLine1Client}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine1Client &&
              formik.errors.addressLine1Client
                ? formik.errors.addressLine1Client
                : ""
            }
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="addressLine2Client"
            id="addressLine2Client"
            name="addressLine2Client"
            type="text"
            label="Address Line 2"
            onChange={formik.handleChange}
            value={formik.values.addressLine2Client}
            onBlur={formik.handleBlur}
            error={
              formik.touched.addressLine2Client &&
              formik.errors.addressLine2Client
                ? formik.errors.addressLine2Client
                : ""
            }
          />
        </div>
        <div className="">
          <MyAutocomplete
            label="Contact"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option?.name}
            options={contactDataClient}
            value={formik.values?.contactClient}
            onChange={(e, newValue) => {
              formik.setFieldValue("contactClient", newValue);
            }}
            error={
              formik.touched.contactClient && formik.errors.contactClient
                ? formik.errors.contactClient
                : ""
            }
            inputProps={{
              onBlur: formik.handleBlur,
              name: "contactClient",
            }}
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="emailClient"
            id="emailClient"
            name="emailClient"
            type="text"
            label="Email"
            onChange={formik.handleChange}
            value={
              formik.values.contactClient?.email
                ? formik.values.contactClient?.email
                : ""
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailClient && formik.errors.emailClient
                ? formik.errors.emailClient
                : ""
            }
            disabled
          />
        </div>
        <div className="">
          <MyInput
            htmlFor="phoneClient"
            id="phoneClient"
            name="phoneClient"
            type="text"
            label="Phone"
            onChange={formik.handleChange}
            value={
              formik.values.contactClient?.phone
                ? formik.values.contactClient?.phone
                : ""
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneClient && formik.errors.phoneClient
                ? formik.errors.phoneClient
                : ""
            }
            disabled
          />
        </div>
      </div>
      <div className="col-span-2 grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2">
          <QuotationTable formik={formik} />
        </div>
      </div>
      <div className="col-span-2 grid bg-white py-5 px-5 rounded-xl shadow-lg grid-cols-2 gap-3">
        <div className="col-span-2">
          <div className="w-full">
            <div className=" py-4 flex items-center justify-between rounded-tl-lg rounded-tr-lg">
              <p className="font-semibold">Terms & Conditions</p>
              <div className="flex items-center gap-1 md:gap-4"></div>
            </div>
            <div>
              <MyInput
                htmlFor="TAndC"
                id="TAndC"
                name="TAndC"
                type="textarea"
                rows={20}
                // label="Item/Service Desc"
                onChange={formik.handleChange}
                value={formik.values.TAndC}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.TAndC && formik.errors.TAndC
                    ? formik.errors.TAndC
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
