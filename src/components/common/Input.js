import React from "react";

const MyInput = ({
  htmlFor,
  label,
  error,
  className,
  autoComplete,
  ...props
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          autoComplete={autoComplete ? autoComplete : "new-password"}
          className={`block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ${
            error ? "ring-red-500" : "ring-gray-300"
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
            error ? "focus:ring-red-500" : "focus:ring-indigo-600"
          } sm:text-sm sm:leading-6 px-2`}
        />
      </div>
      {error && <p className=" min-h-4 me-1 text-xs text-red-500">{error}</p>}
    </>
  );
};

export default MyInput;
