"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import MyInput from "@/components/common/Input";
import { ItemSchema } from "@/models/ItemSchemaQuotation";
import { useSearchParams } from "next/navigation";

const initialValues = {
  itemDesc: "",
  qty: Number().toFixed(2),
  unitPrice: Number().toFixed(2),
  discountPrice: Number().toFixed(2),
};

export default function ItemModal({
  formFor,
  currentData,
  currentIndex,
  isOpen,
  onClose,
  formik: prevFormik,
}) {
  const searchPramas = useSearchParams();
  const financialYear = searchPramas.get("financialYear");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ItemSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      //   const resolveWithSomeData = new Promise(async (resolve, reject) => {
      if (formFor == "Add") {
        prevFormik.setFieldValue("items", [
          ...prevFormik.values.items,
          { ...values },
        ]);
        onClose();
      }
      if (formFor == "Update") {
        prevFormik.setFieldValue(`items.[${currentIndex}]`, { ...values });
        onClose();
      }
      formik.setSubmitting(false);
      //   });

      //   toast.promise(resolveWithSomeData, {
      //     pending: {
      //       render() {
      //         return "Saving...";
      //       },
      //     },
      //     success: {
      //       render({ data }) {
      //         return `${data}`;
      //       },
      //     },
      //     error: {
      //       render({ data }) {
      //         // When the promise reject, data will contains the error
      //         return `${data}`;
      //       },
      //     },
      //   });
    },
  });

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
    if (formFor == "Update") {
      formik.setValues({
        ...currentData,
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
            {formFor == "Add" ? "Add" : "Update"} Item/Service
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-1">
                <MyInput
                  htmlFor="itemDesc"
                  id="itemDesc"
                  name="itemDesc"
                  type="textarea"
                  rows={5}
                  label="Item/Service Desc"
                  onChange={formik.handleChange}
                  value={formik.values.itemDesc}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.itemDesc && formik.errors.itemDesc
                      ? formik.errors.itemDesc
                      : ""
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="mt-1 col-span-2">
                  <MyInput
                    htmlFor="qty"
                    id="qty"
                    name="qty"
                    type="text"
                    label="Quantity"
                    value={formik.values.qty}
                    as="number"
                    formik={formik}
                    error={
                      formik.touched.qty && formik.errors.qty
                        ? formik.errors.qty
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="mt-1">
                  <MyInput
                    htmlFor="unitPrice"
                    id="unitPrice"
                    name="unitPrice"
                    type="text"
                    label="Unit Price"
                    value={formik.values.unitPrice}
                    as="number"
                    formik={formik}
                    error={
                      formik.touched.unitPrice && formik.errors.unitPrice
                        ? formik.errors.unitPrice
                        : ""
                    }
                  />
                </div>
                <div className="mt-1">
                  <MyInput
                    htmlFor="discountPrice"
                    id="discountPrice"
                    name="discountPrice"
                    type="text"
                    label="Discount"
                    value={formik.values.discountPrice}
                    as="number"
                    formik={formik}
                    error={
                      formik.touched.discountPrice &&
                      formik.errors.discountPrice
                        ? formik.errors.discountPrice
                        : ""
                    }
                  />
                </div>
              </div>
              <Button type="submit" className="bg-default text-white mt-4">
                {formFor == "Add" ? "Save" : "Update"}
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
