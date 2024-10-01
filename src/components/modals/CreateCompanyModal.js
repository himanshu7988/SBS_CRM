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

const initialValues = {
  companyName: "",
  gstNumber: "",
  financialYear: "",
  address: "",
  startDate: dayjs("dd/mm/yyyy"),
  endDate: dayjs("dd/mm/yyyy"),
  panNumber: "",
  email: "",
};

export default function CreateCompany() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createCompanySchema,
    onSubmit: (values) => {
      console.log(values);
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <div className="mt-1">
                      <label
                        htmlFor="financialYear"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Financial Year
                      </label>
                      <div className="mt-1">
                        <input
                          id="financialYear"
                          name="financialYear"
                          type="text"
                          autoComplete="financialYear"
                          onChange={formik.handleChange}
                          value={formik.values.financialYear}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.financialYear &&
                        formik.errors.financialYear
                          ? formik.errors.financialYear
                          : ""}
                      </p>
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="gstNumber"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        GST Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="gstNumber"
                          name="gstNumber"
                          type="text"
                          autoComplete="gstNumber"
                          onChange={formik.handleChange}
                          value={formik.values.gstNumber}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.gstNumber && formik.errors.gstNumber
                          ? formik.errors.gstNumber
                          : ""}
                      </p>
                    </div>
                  </div>
                  {/* Start Date & End Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-3">
                    <div className="mt-1">
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Start Date
                      </label>
                      <div className="mt-1">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="w-full"
                            value={formik.values.startDate}
                            onChange={(newValue) =>
                              formik.setFieldValue("startDate", newValue)
                            }
                            onBlur={formik.handleBlur}
                            slotProps={{
                              textField: {
                                size:"small",
                                helperText:
                                  formik.touched.startDate &&
                                  formik.errors.startDate,
                                  error:
                                    formik.touched.startDate ?
                                    Boolean(formik.errors.startDate): false
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>

                    <div className="mt-1">
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        End Date
                      </label>
                      <div className="mt-1">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="w-full"
                            value={formik.values.endDate}
                            onChange={(newValue) =>
                              formik.setFieldValue("endDate", newValue)
                            }
                            onBlur={formik.handleBlur}
                            slotProps={{
                              textField: {
                                size:"small",
                                helperText:
                                  formik.touched.endDate ?
                                  formik.errors.endDate:'',
                                  error:
                                    formik.touched.endDate ?
                                    Boolean(formik.errors.endDate):false

                              },
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <div className="mt-1">
                      <label
                        htmlFor="panNumber"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        PAN Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="panNumber"
                          name="panNumber"
                          type="text"
                          autoComplete="panNumber"
                          onChange={formik.handleChange}
                          value={formik.values.panNumber}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.panNumber && formik.errors.panNumber
                          ? formik.errors.panNumber
                          : ""}
                      </p>
                    </div>
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
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                      />
                    </div>
                    <p className=" min-h-4 me-1 text-xs text-red-500">
                      {formik.touched.address && formik.errors.address
                        ? formik.errors.address
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
