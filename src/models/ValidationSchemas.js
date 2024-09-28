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

  contactPerson: Yup.string()
    .min(2, "Contact person name is too short")
    .max(50, "Contact person name is too long")
    .required("Contact person is required"),

  department: Yup.string()
    .min(2, "Department name is too short")
    .max(50, "Department name is too long")
    .required("Department is required"),

  contactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
    .required("Contact number is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  address: Yup.string()
    .min(5, "Address is too short")
    .max(200, "Address is too long")
    .required("Address is required"),
});
