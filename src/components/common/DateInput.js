"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const DateInput = ({ htmlFor, label, error, ...props }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900 mb-1"
      >
        {label}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...props}
          className="w-full"
          slotProps={{
            textField: {
              // size: "small",
              sx: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.375rem", // Adjust the border radius
                  borderColor: "#d1d5db", // Set the border color
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db", // Border color on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4f46e5", // Border color when focused
                  },
                },
                "& .MuiInputBase-input": {
                  color: "black",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  paddingTop: "0.485rem",
                  paddingBottom: "0.485rem",
                  paddingLeft: "0.6rem",
                  paddingRight: "0.5rem",
                },
              },
              helperText: error ? error : "",
              error: error ? true : false,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateInput;
