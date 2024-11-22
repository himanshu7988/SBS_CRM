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
export const GetUsersList = async (data) => {
  return await apiClient.get(`${BASE_URL}admin/GetUsersList?page=${data?.page}&pageSize=${data?.pageSize}&search=${data?.search}`);
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
export const CreateUser = async (data) => {
  return await apiClient.post(`${BASE_URL}admin/CreateUser`, data);
};
export const UpdateRole = async (id,data) => {
  return await apiClient.patch(`${BASE_URL}admin/UpdateRole?_id=${id}`, data);
};
export const UpdateUser = async (id,data) => {
  return await apiClient.patch(`${BASE_URL}admin/UpdateUser?_id=${id}`, data);
};
export const DeleteRole = async (id) => {
  return await apiClient.delete(`${BASE_URL}admin/DeleteRole?_id=${id}`);
};
export const DeleteUser = async (id) => {
  return await apiClient.delete(`${BASE_URL}admin/DeleteUser?_id=${id}`);
};
