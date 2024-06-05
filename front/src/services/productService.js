import axios from 'axios';

const API_URL = 'http://localhost:8000/product';

export const getProductByBarcode = (barcode) => {
    return axios.get(`${API_URL}/barcode/${barcode}`);
};

export const searchProductsByCategory = (category) => {
    return axios.get(`${API_URL}/category/${category}`);
};