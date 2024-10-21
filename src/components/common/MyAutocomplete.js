import {
  Autocomplete,
  CircularProgress,
  styled,
  TextField,
} from "@mui/material";
import React from "react";

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

const MyAutocomplete = ({
  loading,
  label,
  error,
  size,
  renderInput,
  textFieldProps,
  inputProps,
  ...props
}) => {
  return (
    <>
      <label
        htmlFor="pan"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <Autocomplete
        {...props}
        autoComplete={false}
        disablePortal
        size={size ? size : "small"}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            {...inputProps}
            error={error}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
      {error && <p className=" min-h-4 me-1 text-xs text-red-500">{error}</p>}
    </>
  );
};

export default MyAutocomplete;
