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
import MyInput from "../../common/Input";
import {
  CreateContact,
  getCityList,
  getCountriesList,
  getStatesList,
  UpdateContact,
} from "@/config/Api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addContactSchema } from "@/models/ValidationSchemas";
import MyAutocomplete from "@/components/common/MyAutocomplete";
import { useSearchParams } from "next/navigation";

const options = [
  { label: "Credit", id: 1, type: "Cr" },
  { label: "Debit", id: 2, type: "Dr" },
];

const initialValues = {
  name: "",
  department: "",
  email: "",
  phone: "",
  stdCode: "",
  landline: "",
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

export default function AddContactModal({
  formFor,
  currentDataPrev,
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
    validationSchema: addContactSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      const resolveWithSomeData = new Promise(async (resolve, reject) => {
        if (formFor == "Add") {
          console.log(values,currentData);
          await CreateContact({
            ...values,
            ledger: currentDataPrev?._id,
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
          await UpdateContact(currentData._id, {
            ...values,
            ledger: currentDataPrev?._id,
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
            {formFor == "Add" ? "Add" : "Update"} Contact
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-1">
                <MyInput
                  htmlFor="name"
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
                />
              </div>
              <div className="mt-1">
                <MyInput
                  htmlFor="department"
                  id="department"
                  name="department"
                  type="text"
                  label="Department"
                  onChange={formik.handleChange}
                  value={formik.values.department}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.department && formik.errors.department
                      ? formik.errors.department
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
              <div className="mt-1">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="mt-1">
                  <MyInput
                    htmlFor="stdCode"
                    id="stdCode"
                    name="stdCode"
                    type="text"
                    label="Std Code"
                    onChange={formik.handleChange}
                    value={formik.values.stdCode}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.stdCode && formik.errors.stdCode
                        ? formik.errors.stdCode
                        : ""
                    }
                  />
                </div>
                <div className="mt-1">
                  <MyInput
                    htmlFor="landline"
                    id="landline"
                    name="landline"
                    type="text"
                    label="Landline"
                    onChange={formik.handleChange}
                    value={formik.values.landline}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.landline && formik.errors.landline
                        ? formik.errors.landline
                        : ""
                    }
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
