import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:4000/v1/";
// export const BASE_URL_IMG = "http://192.168.11.153:3001";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 60000, // Wait up to 10 seconds before timing out
  withCredentials: true,
});

// Add a request interceptor to include the Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// get api's

export const getCompanyById = async (companyid) => {
  return await apiClient.get(
    `${BASE_URL}Client/FetchCompanyByID?companyid=${companyid}`
  );
};
export const GetRoleList = async (data) => {
  return await apiClient.get(`${BASE_URL}admin/GetRoleList?page=${data?.page}&pageSize=${data?.pageSize}&search=${data?.search}`);
};
export const login = async (data) => {
  return await axios.post(`${BASE_URL}admin/login`, data, {
    withCredentials: true, // Ensures cookies are sent/received
  });
};
export const CreateCompanyApi = async (data) => {
  return await apiClient.post(`${BASE_URL}admin/CreateCompany`, data);
};
export const CreateRole = async (data) => {
  return await apiClient.post(`${BASE_URL}admin/CreateRole`, data);
};
