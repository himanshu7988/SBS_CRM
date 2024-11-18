"use client";
import {
  addContactSchema,
  createCompanySchema,
} from "@/models/ValidationSchemas";
import { IconButton, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CreateCompanyApi } from "@/config/Api";

const initialValues = {
  companyName: "",
  companyMailingName: "",
  email: "",
  gst: "",
  pan: "",
  beginYear: dayjs(),
  billingAddress: "",
};

export default function CreateCompany() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: createCompanySchema,
    onSubmit: async (values) => {
      try {
        const response = await CreateCompanyApi(values);
        if (response.data && response.data.success) {
          // Redirect after successful login
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      }
    },
  });

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  return (
    <>
      <Button className="text-white" onClick={onOpen}>
        Add New Company
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="top"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Company
              </ModalHeader>
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-1">
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="companyName"
                        onChange={formik.handleChange}
                        value={formik.values.companyName}
                        onBlur={formik.handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                      />
                    </div>
                    <p className=" min-h-4 me-1 text-xs text-red-500">
                      {formik.touched.companyName && formik.errors.companyName
                        ? formik.errors.companyName
                        : ""}
                    </p>
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="companyMailingName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mailing Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="companyMailingName"
                        name="companyMailingName"
                        type="text"
                        autoComplete="companyMailingName"
                        onChange={formik.handleChange}
                        value={formik.values.companyMailingName}
                        onBlur={formik.handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                      />
                    </div>
                    <p className=" min-h-4 me-1 text-xs text-red-500">
                      {formik.touched.companyMailingName &&
                      formik.errors.companyMailingName
                        ? formik.errors.companyMailingName
                        : ""}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <div className="mt-1">
                      <label
                        htmlFor="pan"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        PAN Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="pan"
                          name="pan"
                          type="text"
                          autoComplete="pan"
                          onChange={formik.handleChange}
                          value={formik.values.pan}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.pan && formik.errors.pan
                          ? formik.errors.pan
                          : ""}
                      </p>
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="gst"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        GST Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="gst"
                          name="gst"
                          type="text"
                          autoComplete="gst"
                          onChange={formik.handleChange}
                          value={formik.values.gst}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.gst && formik.errors.gst
                          ? formik.errors.gst
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <div className="mt-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          autoComplete="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""}
                      </p>
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="beginYear"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        BeginYear
                      </label>
                      <div className="mt-1">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="w-full"
                            value={formik.values.beginYear}
                            onChange={(newValue) =>
                              formik.setFieldValue("beginYear", newValue)
                            }
                            maxDate={dayjs()}
                            openTo="year"
                            views={["year"]}
                            onBlur={formik.handleBlur}
                            slotProps={{
                              textField: {
                                size: "small",
                                helperText: formik.touched.beginYear
                                  ? formik.errors.beginYear
                                  : "",
                                error: formik.touched.beginYear
                                  ? Boolean(formik.errors.beginYear)
                                  : false,
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="billingAddress"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Billing Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="billingAddress"
                        name="billingAddress"
                        type="text"
                        autoComplete="billingAddress"
                        onChange={formik.handleChange}
                        value={formik.values.billingAddress}
                        onBlur={formik.handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                      />
                    </div>
                    <p className=" min-h-4 me-1 text-xs text-red-500">
                      {formik.touched.billingAddress &&
                      formik.errors.billingAddress
                        ? formik.errors.billingAddress
                        : ""}
                    </p>
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
