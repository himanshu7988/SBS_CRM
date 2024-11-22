"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

const Provider = ({ children }) => {
  return (
    <NextUIProvider>
      {children}
      <ToastContainer
        autoClose={3000}
        theme="colored"
        pauseOnFocusLoss={false}
        hideProgressBar={true}
      />
    </NextUIProvider>
  );
};

export default Provider;
