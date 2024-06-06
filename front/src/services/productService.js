import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getProductByBarcode = (barcode) => {
  return axios.get(`/product/barcode/${barcode}`);
};

export const searchProductsByCategory = (category) => {
  return axios.get(`/product/category/${category}`);
};

export const getAlternativeProducts = (barcode) => {
  return axios.get(`/product/alternatives/${barcode}`);
};

export const saveSubstitutes = (data) => {
  const token = getToken();
  return axios.post(`/user/saveSubstitutes`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getSavedSubstitutes = () => {
  const token = getToken();
  return axios.get(`/user/substitutedProducts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
