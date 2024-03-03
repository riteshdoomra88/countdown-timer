import axios from "axios";
var cookies = require("cookie-cutter");

const apiUrl = process.env.apiUrl;
const apiBaseUrl = process.env.baseUrl;

export let instance = axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response && originalRequest.url.includes(apiUrl)) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
      }
      // else if (error.response.status === 403) {
      //   const url = `${process.env.baseUrl}/${getCountry()}`;
      //   removeRT();
      //   window.location.href = url;
      // }
    }
    return Promise.reject(error);
  }
);



export function getData(query: string, api?: string) {
  return axios({
    method: "get",
    url: `${api ? api : apiUrl}${query}`,
  });
}

// get call for local json data
export function getJsonData(query: any) {
  return axios({
    method: "get",
    url: `${apiBaseUrl}${query}`,
  });
}

// For Get Api
export function getQueryData(api: string) {
  return axios({
    method: "get",
    url: `${api}`,
  });
}

export function getDataFullPath(apiUrl: string) {
  return axios({
    method: "get",
    url: apiUrl,
  });
}

export function getPostFullPath(apiUrl: string, data: any) {
  return axios({
    method: "post",
    url: apiUrl,
    data: data,
  });
}

/** Basic POST Api */
export function postMethod(query: string, bodyData: any) {
  return axios({
    method: "post",
    url: apiUrl + query,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// file upload
export function postUpload(query: string, bodyData: any) {
  return axios({
    method: "post",
    url: apiUrl + query,
    data: bodyData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// Delete Api
export function deleteMethod(query: string) {
  return axios({
    method: "DELETE",
    url: apiUrl + query,
  });
}
