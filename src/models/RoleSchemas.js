import * as Yup from "yup";

export const roleSchema = Yup.object().shape({
  roleName: Yup.string().required("Required*"),
});