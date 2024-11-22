import * as Yup from "yup";

export const usersSchema = Yup.object().shape({
  name: Yup.string().required("Required*"),
  email: Yup.string().required("Required*"),
  password: Yup.string().required("Required*"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required*"),
  userType: Yup.string().required("Required*"),
});