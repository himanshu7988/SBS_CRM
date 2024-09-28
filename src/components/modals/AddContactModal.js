"use client";
import { addContactSchema } from "@/models/ValidationSchemas";
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
  contactPerson: "",
  department: "",
  contactNo: "",
  email: "",
  address: "",
};

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addContactSchema,
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
      <Tooltip content="Add Contact" showArrow>
        <IconButton onClick={onOpen}>
          <FaPlus fontSize={20} />
        </IconButton>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Contact
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
                        htmlFor="contactPerson"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact Person
                      </label>
                      <div className="mt-1">
                        <input
                          id="contactPerson"
                          name="contactPerson"
                          type="text"
                          autoComplete="contactPerson"
                          onChange={formik.handleChange}
                          value={formik.values.contactPerson}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.contactPerson &&
                        formik.errors.contactPerson
                          ? formik.errors.contactPerson
                          : ""}
                      </p>
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Department
                      </label>
                      <div className="mt-1">
                        <input
                          id="department"
                          name="department"
                          type="text"
                          autoComplete="department"
                          onChange={formik.handleChange}
                          value={formik.values.department}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.department && formik.errors.department
                          ? formik.errors.department
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
                        htmlFor="contactNo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact No.
                      </label>
                      <div className="mt-1">
                        <input
                          id="contactNo"
                          name="contactNo"
                          type="text"
                          autoComplete="contactNo"
                          onChange={formik.handleChange}
                          value={formik.values.contactNo}
                          onBlur={formik.handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                      </div>
                      <p className=" min-h-4 me-1 text-xs text-red-500">
                        {formik.touched.contactNo && formik.errors.contactNo
                          ? formik.errors.contactNo
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
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
                  <Button
                    type="submit"
                    className="bg-default text-white mt-4"
                  >
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
