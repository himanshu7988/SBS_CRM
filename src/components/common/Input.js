"use client";

import React, { useEffect, useRef, useState } from "react";

const MyInput = ({
  htmlFor,
  label,
  error,
  className,
  autoComplete,
  inputAdornmentEnd,
  inputAdornmentStart,
  type,
  as,
  formik,
  ...props
}) => {
  const spanRefEnd = useRef(null);
  const spanRefStart = useRef(null);
  const [spanWidthEnd, setSpanWidthEnd] = useState(0);
  const [spanWidthStart, setSpanWidthStart] = useState(0);

  // Update the padding based on span width
  useEffect(() => {
    if (spanRefEnd.current) {
      // Set span width dynamically
      setSpanWidthEnd(spanRefEnd.current.offsetWidth);
    }
  }, [spanRefEnd.current]);
  useEffect(() => {
    if (spanRefStart.current) {
      // Set span width dynamically
      setSpanWidthStart(spanRefStart.current.offsetWidth);
    }
  }, [spanRefStart.current]);
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-1 relative">
        {type == "textarea" ? (
          <textarea
            {...props}
            autoComplete={autoComplete ? autoComplete : "new-password"}
            className={`block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ${
              error ? "ring-red-500" : "ring-gray-300"
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              error ? "focus:ring-red-500" : "focus:ring-indigo-600"
            } sm:text-sm px-2`}
            style={{
              paddingRight: spanWidthEnd ? `${spanWidthEnd + 15}px` : "",
              paddingLeft: spanWidthStart ? `${spanWidthStart + 15}px` : "",
            }}
          />
        ) : as == "number" ? (
          <input
            {...props}
            autoComplete={autoComplete ? autoComplete : "new-password"}
            className={`block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ${
              error ? "ring-red-500" : "ring-gray-300"
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              error ? "focus:ring-red-500" : "focus:ring-indigo-600"
            } sm:text-sm sm:leading-6 px-2`}
            style={{
              paddingRight: spanWidthEnd ? `${spanWidthEnd + 15}px` : "",
              paddingLeft: spanWidthStart ? `${spanWidthStart + 15}px` : "",
            }}
            onFocus={(e) => {
              let value = Number(formik.values?.[event.target.name]).toFixed(2);
              if (value == 0.0) {
                formik.setFieldValue(event.target.name, "");
              }
            }}
            onBlur={(e) => {
              let value = Number(formik.values?.[event.target.name]).toFixed(2);
              formik.setFieldValue(event.target.name, value);

              formik.handleBlur(e);
            }}
            onChange={(event) => {
              const inputValue = event.target.value;
              // Regular expression to allow only float values with up to 2 decimal places
              if (/^\d*\.?\d{0,2}$/.test(inputValue) || inputValue === "") {
                formik.setFieldValue(event.target.name, inputValue);
              }
            }}
          />
        ) : (
          <input
            {...props}
            autoComplete={autoComplete ? autoComplete : "new-password"}
            className={`block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ${
              error ? "ring-red-500" : "ring-gray-300"
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              error ? "focus:ring-red-500" : "focus:ring-indigo-600"
            } sm:text-sm sm:leading-6 px-2`}
            style={{
              paddingRight: spanWidthEnd ? `${spanWidthEnd + 15}px` : "",
              paddingLeft: spanWidthStart ? `${spanWidthStart + 15}px` : "",
            }}
          />
        )}
        {inputAdornmentEnd && (
          <span
            ref={spanRefEnd}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          >
            {inputAdornmentEnd}
          </span>
        )}
        {inputAdornmentStart && (
          <span
            ref={spanRefStart}
            className="absolute top-1/2 -translate-y-1/2 left-2"
          >
            {inputAdornmentStart}
          </span>
        )}
      </div>
      {error && <p className=" min-h-4 me-1 text-xs text-red-500">{error}</p>}
    </>
  );
};

export default MyInput;
