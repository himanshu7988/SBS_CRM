"use client";
import {
  addContactSchema,
  createCompanySchema,
} from "@/models/ValidationSchemas";
import { IconButton } from "@mui/material";
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

const initialValues = {
  companyName: "",
  gstNo: "",
  financialYear: "",
  address: "",
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
