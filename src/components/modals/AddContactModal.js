"use client";
import { addContactSchema } from "@/models/ValidationSchemas";
import {
  Autocomplete,
  CircularProgress,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Switch,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import MyInput from "../common/Input";
import MyAutocomplete from "../common/MyAutocomplete";

const initialValues = {
  companyName: "",
  gst: "",
  pan: "",
  contactNo: "",
  email: "",
  address1: "",
  address2: "",
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

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addContactSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const options = [
    { label: "Credit", id: 1, type: "Cr" },
    { label: "Debit", id: 2, type: "Dr" },
  ];

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
                Add Contact
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
                        getOptionLabel={(option) => option?.label}
                        options={options}
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
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-1">
                    <div>
                      <MyAutocomplete
                        label="State"
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => option?.label}
                        options={options}
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
                    <div>
                      <MyAutocomplete
                        label="City"
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => option?.label}
                        options={options}
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
                      htmlFor="address1"
                      id="address1"
                      name="address1"
                      type="text"
                      label="Address Line 1"
                      onChange={formik.handleChange}
                      value={formik.values.address1}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.address1 && formik.errors.address1
                          ? formik.errors.address1
                          : ""
                      }
                    />
                  </div>
                  <div className="mt-1">
                    <MyInput
                      htmlFor="address2"
                      id="address2"
                      name="address2"
                      type="text"
                      label="Address Line 2"
                      onChange={formik.handleChange}
                      value={formik.values.address2}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.address2 && formik.errors.address2
                          ? formik.errors.address2
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
