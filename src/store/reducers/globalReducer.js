import { getCompanyById } from "@/config/Api";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userData = Cookies.get("userData")!== undefined ? JSON.parse(Cookies.get("userData")) : undefined;

const initialState = {
  token: !token && (token==undefined) ? null :token,
  companyData: {},
  userData: !userData && (userData==undefined) ? null : userData,
  myPermissions: []
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    case "SET_MY_PERMISSIONS":
      return { ...state, myPermissions: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_COMPANY":
        return { ...state, companyData: action.payload};
    default:
      return state;
  }
};

export default globalReducer;
