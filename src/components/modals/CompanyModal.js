"use client";
import { styled, TextField } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import MyInput from "../common/Input";
import { CreateCompany, UpdateCompany } from "@/config/Api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { createCompanySchema } from "@/models/ValidationSchemas";
import DateInput from "@/components/common/DateInput";

const initialValues = {
  companyName: "",
  companyMailingName: "",
  email: "",
  gst: "",
  pan: "",
  beginYear: dayjs(),
  billingAddress: "",
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

export default function CompanyModal({
  formFor,
  currentData,
  isOpen,
  onClose,
  setLoaded,
}) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createCompanySchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      const resolveWithSomeData = new Promise(async (resolve, reject) => {
        if (formFor == "Add") {
          await CreateCompany({
            ...values,
            beginYear: dayjs(values.beginYear).format("YYYY"),
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
          await UpdateCompany(currentData._id, values)
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

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
    if (formFor == "Update") {
      formik.setValues({
        ...currentData,
        beginYear: dayjs(currentData?.beginYear),
      });
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
              <div className="mt-1">
                <MyInput
                  htmlFor="companyMailingName"
                  id="companyMailingName"
                  name="companyMailingName"
                  type="text"
                  label="Mailing Name"
                  onChange={formik.handleChange}
                  value={formik.values.companyMailingName}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.companyMailingName &&
                    formik.errors.companyMailingName
                      ? formik.errors.companyMailingName
                      : ""
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="mt-1">
                  <MyInput
                    htmlFor="pan"
                    id="pan"
                    name="pan"
                    type="text"
                    label="PAN Number"
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
                <div className="mt-1">
                  <MyInput
                    htmlFor="gst"
                    id="gst"
                    name="gst"
                    type="text"
                    label="GST Number"
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="mt-1">
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
                <div className="mt-1">
                  <DateInput
                    label="BeginYear"
                    value={formik.values.beginYear}
                    onChange={(newValue) =>
                      formik.setFieldValue("beginYear", newValue)
                    }
                    maxDate={dayjs()}
                    openTo="year"
                    views={["year"]}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.beginYear &&
                      Boolean(formik.errors.beginYear)
                        ? formik.errors.beginYear
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="mt-1">
                <MyInput
                  htmlFor="billingAddress"
                  id="billingAddress"
                  name="billingAddress"
                  type="text"
                  label="Billing Address"
                  onChange={formik.handleChange}
                  value={formik.values.billingAddress}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.billingAddress &&
                    formik.errors.billingAddress
                      ? formik.errors.billingAddress
                      : ""
                  }
                />
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
