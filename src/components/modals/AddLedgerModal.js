"use client";
import { styled, TextField } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  autocomplete,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import MyInput from "@/components/common/Input";
import {
  CreateLeader,
  getCityList,
  getCountriesList,
  getStatesList,
  UpdateLedger,
} from "@/config/Api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addLedgerSchema } from "@/models/ValidationSchemas";
import MyAutocomplete from "@/components/common/MyAutocomplete";
import { useSearchParams } from "next/navigation";

const options = [
  { label: "Credit", id: 1, type: "Cr" },
  { label: "Debit", id: 2, type: "Dr" },
];

const initialValues = {
  companyName: "",
  gst: "",
  pan: "",
  contactNo: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: null,
  state: null,
  country: null,
  openingAmount: 0,
  crDr: { label: "Credit", id: 1, type: "Cr" },
  // international: false,
};

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: error ? "#ef4444" : "#d1d5db", // Default border color
    },
    "&:hover fieldset": {
      borderColor: error ? "#ef4444" : "#d1d5db", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "#ef4444" : "#4f46e5", // Border color on focus
    },
  },
  "& .MuiFormHelperText-root": {
    margin: "0px",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    marginRight: "",
    minHeight: "1rem",
    marginInlineEnd: "0.25rem",
  },
}));

export default function AddLedgerModal({
  formFor,
  currentData,
  isOpen,
  onClose,
  setLoaded,
}) {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const searchPramas = useSearchParams();
  const financialYear = searchPramas.get("financialYear");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addLedgerSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      const resolveWithSomeData = new Promise(async (resolve, reject) => {
        if (formFor == "Add") {
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
        }
        if (formFor == "Update") {
          await UpdateLedger(currentData._id, {
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
        }
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

  const getCountry = async () => {
    try {
      const resCountry = await getCountriesList();
      if (resCountry) {
        setCountryData(resCountry?.data?.data);
      }
    } catch (error) {}
  };
  const getState = async (id) => {
    try {
      const resCountry = await getStatesList({ id });
      if (resCountry) {
        setStateData(resCountry?.data?.data);
      }
    } catch (error) {}
  };
  const getCity = async (id) => {
    try {
      const resCountry = await getCityList({ id });
      if (resCountry) {
        setCityData(resCountry?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!formik.values.country) {
      setStateData([]);
      setCityData([]);
    } else {
      getState(formik.values.country?.id);
    }
  }, [formik.values.country]);
  useEffect(() => {
    if (!formik.values.state) {
      setCityData([]);
    } else {
      getCity(formik.values.state?.id);
    }
  }, [formik.values.state]);

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
    if (formFor == "Update") {
      formik.setValues({
        ...currentData,
        crDr: options.filter((item) => item?.type == currentData.crDr)[0],
      });
    }
    if (isOpen) {
      getCountry();
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        placement="top"
        isDismissable={false}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {formFor == "Add" ? "Add" : "Update"} Company
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-1">
                <MyInput
                  htmlFor="companyName"
                  id="companyName"
                  name="companyName"
                  type="text"
                  label="Company Name"
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.companyName && formik.errors.companyName
                      ? formik.errors.companyName
                      : ""
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="mt-1 col-span-2">
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="mt-1">
                  <MyInput
                    htmlFor="gst"
                    id="gst"
                    name="gst"
                    type="text"
                    label="GST"
                    onChange={formik.handleChange}
                    value={formik.values.gst}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.gst && formik.errors.gst
                        ? formik.errors.gst
                        : ""
                    }
                  />
                </div>
                <div className="mt-1">
                  <MyInput
                    htmlFor="pan"
                    id="pan"
                    name="pan"
                    type="text"
                    label="PAN"
                    onChange={formik.handleChange}
                    value={formik.values.pan}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.pan && formik.errors.pan
                        ? formik.errors.pan
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-1">
                <div className="col-span-2">
                  <MyAutocomplete
                    label="Country"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option?.name}
                    options={countryData}
                    value={formik.values?.country}
                    onChange={(e, newValue) => {
                      formik.setValues({
                        ...formik.values,
                        country: newValue,
                        state: null,
                        city: null,
                      });
                    }}
                    error={
                      formik.touched.country && formik.errors.country
                        ? formik.errors.country
                        : ""
                    }
                    inputProps={{
                      onBlur: formik.handleBlur,
                      name: "country",
                      autocomplete: "new-password",
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-1">
                <div>
                  <MyAutocomplete
                    label="State"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option?.name}
                    options={stateData}
                    value={formik.values?.state}
                    onChange={(e, newValue) => {
                      formik.setValues({
                        ...formik.values,
                        state: newValue,
                        city: null,
                      });
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
                <div>
                  <MyAutocomplete
                    label="City"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option?.name}
                    options={cityData}
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
              </div>
              <div className="mt-1">
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
              <div className="mt-1">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-1">
                <div className="">
                  <MyInput
                    htmlFor="openingAmount"
                    id="openingAmount"
                    name="openingAmount"
                    type="text"
                    label="Opening Amount"
                    onChange={formik.handleChange}
                    value={formik.values.openingAmount}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.openingAmount &&
                      formik.errors.openingAmount
                        ? formik.errors.openingAmount
                        : ""
                    }
                  />
                </div>
                <div>
                  <MyAutocomplete
                    disableClearable
                    label="Balance Type"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option?.label}
                    options={options}
                    value={formik.values?.crDr}
                    onChange={(e, newValue) => {
                      formik.setFieldValue("crDr", newValue);
                    }}
                    error={
                      formik.touched.crDr && formik.errors.crDr
                        ? formik.errors.crDr
                        : ""
                    }
                    inputProps={{
                      onBlur: formik.handleBlur,
                      name: "crDr",
                    }}
                  />
                </div>
              </div>
              <Button type="submit" className="bg-default text-white mt-4">
                Save
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
