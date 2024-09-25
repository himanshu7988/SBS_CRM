import * as Yup from "yup";

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required*"),
  password: Yup.string()
    .min(8, "Min 8 characters required")
    .required("Required*"),
});