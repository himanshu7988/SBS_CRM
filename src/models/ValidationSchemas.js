import * as Yup from "yup";

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required*"),
  password: Yup.string()
    .min(8, "Min 8 characters required")
    .required("Required*"),
});

export const addContactSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Company name is too short")
    .max(100, "Company name is too long")
    .required("Company name is required"),

  country: Yup.object().required("Country is required"),
  state: Yup.object().required("State is required"),
  city: Yup.object().required("City is required"),

  gst: Yup.string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/,
      "Invalid GST number format"
    )
    .required("GST number is required"),

  pan: Yup.string()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN number is not valid (e.g., ABCDE1234F)"
    )
    .required("PAN number is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const createCompanySchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Company name is too short")
    .max(100, "Company name is too long")
    .required("Company name is required"),

  gst: Yup.string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/,
      "Invalid GST number format"
    )
    .required("GST number is required"),

  // financialYear: Yup.number()
  //   .typeError("Year must be a number")
  //   .min(1000, "Year must have at least four digits")
  //   .max(9999, "Year must not exceed four digits")
  //   .required("Year is required"),

  billingAaddress: Yup.string()
    .min(5, "Address is too short")
    .max(200, "Address is too long")
    .required("Address is required"),

  // beginYear: Yup.string()
  //   .nullable()
  //   .required("Start date is required")
  //   .typeError("Start date must be a valid date"),

  // startDate: Yup.date()
  //   .nullable()
  //   .required("Start date is required")
  //   .typeError("Start date must be a valid date"),

  // endDate: Yup.date()
  //   .nullable()
  //   .required("End date is required")
  //   .typeError("End date must be a valid date")
  //   .min(Yup.ref("startDate"), "End date must be later than start date"),

  pan: Yup.string()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN number is not valid (e.g., ABCDE1234F)"
    )
    .required("PAN number is required"),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not valid"
    )
    .email("Invalid email address")
    .required("Email is required"),
});
