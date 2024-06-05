import axios from "axios";

export const getProductByBarcode = (barcode) => {
  return axios.get(`/product/barcode/${barcode}`);
};

export const searchProductsByCategory = (category) => {
  return axios.get(`/product/category/${category}`);
};
