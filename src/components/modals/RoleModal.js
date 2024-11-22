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
import { roleSchema } from "@/models/RoleSchemas";
import { CreateRole, UpdateRole } from "@/config/Api";
import { toast } from "react-toastify";

const initialValues = {
  roleName: "",
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

export default function RoleModal({
  formFor,
  currentData,
  isOpen,
  onClose,
  setLoaded,
}) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: roleSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      const resolveWithSomeData = new Promise(async (resolve, reject) => {
        if (formFor == "Add") {
          await CreateRole(values)
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
          await UpdateRole(currentData._id, values)
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

  const options = [
    { label: "Credit", id: 1, type: "Cr" },
    { label: "Debit", id: 2, type: "Dr" },
  ];

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
    if(formFor=="Update"){
      formik.setValues(currentData);
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
            {formFor == "Add" ? "Add" : "Update"} Role
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-1">
                <MyInput
                  htmlFor="roleName"
                  id="roleName"
                  name="roleName"
                  type="text"
                  label="Role Name"
                  onChange={formik.handleChange}
                  value={formik.values.roleName}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.roleName && formik.errors.roleName
                      ? formik.errors.roleName
                      : ""
                  }
                />
              </div>
              <Button
                type="submit"
                className="bg-default text-white mt-4"
                isLoading={formik.isSubmitting}
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
        </ModalContent>
      </Modal>
    </>
  );
}
