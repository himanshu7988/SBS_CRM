import * as Yup from "yup";

export const usersSchema = Yup.object().shape({
  name: Yup.string().required("Required*"),
  email: Yup.string().required("Required*"),
  password: Yup.string().required("Required*"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required*"),
  userType: Yup.object().required("Required*"),
});
export const usersUpdateSchema = Yup.object().shape({
  name: Yup.string().required("Required*"),
  email: Yup.string().required("Required*"),
  userType: Yup.object().required("Required*"),
});
export const usersResetPassSchema = Yup.object().shape({
  password: Yup.string().required("Required*"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required*"),
});