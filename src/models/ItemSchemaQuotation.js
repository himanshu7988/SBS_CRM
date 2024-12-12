import * as Yup from "yup";

export const ItemSchema = Yup.object().shape({
  itemDesc: Yup.string().required("Required*"),
  qty: Yup.string(),
  unitPrice: Yup.string(),
  discountPrice: Yup.string(),
});
