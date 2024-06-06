import axios from "axios";

export const getProductByBarcode = (barcode) => {
  return axios.get(`/product/barcode/${barcode}`);
};

export const searchProductsByCategory = (category) => {
  return axios.get(`/product/category/${category}`);
};

export const getAlternativeProducts = (categories) => {
  console.log("categories: ", categories);
  return axios.get(`/product/alternatives`, {categories: categories});
};

export const saveSubstitute = (data) => {
  return axios.post(`/product/saveSubstitute`, data);
};
