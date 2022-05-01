import axios from "axios";

export const SERVER_URL = process.env.SERVER_URL || process.env.REACT_APP_SERVER_URL;
console.log(SERVER_URL);

axios.defaults.baseURL = SERVER_URL + "/";
axios.defaults.withCredentials = true;

// //------------ REQUEST INTERCEPTOR ----------------------//
// axios.interceptors.request.use(config => {
//   // Do something before any api request
//   return config;
// });

// //------------ RESPONSE INTERCEPTOR ----------------------//
// axios.interceptors.response.use(
//   response => {
//     const data = response.data;
//     return data;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

const callback = res => res.data;

//-------------- API SERVICE ----------------------//
const APIService = {
  GET: (url, params = {}, options) => axios.get(url, { params, ...options }).then(callback),
  POST: (url, data, params = {}) => axios.post(url, data, { params }).then(callback),
  PUT: (url, data) => axios.put(url, data).then(callback),
  DELETE: (url, params) => axios.delete(url, { params }).then(callback),
  PATCH: (url, data, params = {}) => axios.patch(url, data, { params }).then(callback),
  POST_FORM: (url, data, params) =>
    axios.post(url, data, { headers: { "Content-type": "multipart/form-data" }, params }).then(callback),
  UPDATE_FORM: (url, data, params) =>
    axios.put(url, data, { headers: { "Content-type": "multipart/form-data" }, params }).then(callback),
  GET_FILE: (url, params = {}, options) => axios.get(url, { params, responseType: "blob", ...options }).then(callback)
};

//------------ AXIOS HEADERS --------------------//
export const addAuthHeaders = value => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${value}`;
  localStorage.setItem("jwt-token", value);
};
export const removeAuthHeaders = () => {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("jwt-token");
};

export const getTokenFromStorage = () => localStorage.getItem("jwt-token");

export const throwError = err => {
  throw err;
};

export const { GET, POST, PUT, PATCH, DELETE, POST_FORM, UPDATE_FORM, GET_FILE } = APIService;
