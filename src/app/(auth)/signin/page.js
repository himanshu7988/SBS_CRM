"use client";
import { login } from "@/config/Api";
import { SigninSchema } from "@/models/ValidationSchemas";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const [show, setShow] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      // router.push("/selectCompany");
      try {
        const response = await login(values);

        // Check for success
        if (response.data && response.data.token) {
          // Redirect after successful login
          router.push("/selectCompany");
        } else {
          toast.error("Unexpected error occurred.");
        }
      } catch (err) {
        if (err.response?.data?.message) {
          return toast.error(err.response?.data?.message);
        }
        toast.error(err?.message);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <section className="h-screen w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="bg-gray-100 h-full flex items-center justify-center flex-col">
          {/* <Image src="/images/linkup.png" alt="image" width={50} height={50} /> */}
          <div>
            <h2 className="text-3xl font-semibold tracking-wider text-default">
              Let&apos;s you sign in{" "}
            </h2>
            <span className="text-lg">Welcome to our Page</span>
            <form className="mt-8" onSubmit={formik.handleSubmit}>
              <div className="mt-3 flex flex-col gap-2">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="px-3 py-3 rounded-lg border-2 border-default w-[22rem]"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="me-1 text-xs text-red-500 text-end">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""}
                </p>
              </div>
              <div className="mt-0 flex flex-col gap-2">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <div className="relative w-[22rem]">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    className="px-3 py-3 rounded-lg border-2 border-default w-full"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {show ? (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-default"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <ImEye className="text-2xl" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-default"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      <ImEyeBlocked className="text-2xl" />
                    </button>
                  )}
                </div>
                <p className="me-1 text-xs text-red-500 text-end">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""}
                </p>
              </div>
              <div className="flex flex-col items-center mt-8 gap-4">
                <Button
                  size="lg"
                  className="text-white text-xl font-semibold bg-default w-[22rem]"
                  type="submit"
                  isLoading={formik.isSubmitting}
                >
                  Log in
                </Button>
                <Button
                  size="lg"
                  className="text-xl border-2 border-default bg-white w-[22rem]"
                  isDisabled={formik.isSubmitting}
                >
                  Continue With Email
                </Button>
              </div>
              <div className="flex items-center justify-center mt-3 text-lg">
                Don&apos;t have an account?{" "}
                <span className="text-default underline font-semibold cursor-pointer">
                  Sign up
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full hidden md:flex flex-col justify-center items-center ">
          <div className="relative w-4/5 aspect-square m-auto">
            <Image src="/images/signin.png" fill={true} alt="image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
