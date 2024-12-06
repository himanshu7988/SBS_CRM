"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/app/reduxProvider";

const Provider = ({ children }) => {
  return (
    <ReduxProvider>
      <NextUIProvider>
        {children}
        <ToastContainer
          autoClose={3000}
          theme="colored"
          pauseOnFocusLoss={false}
          hideProgressBar={true}
        />
      </NextUIProvider>
    </ReduxProvider>
  );
};

export default Provider;
