import axios from "axios";
const baseURL: string | undefined = import.meta.env.VITE_URL;

export const getAllCover = async () => {
  const url = `${baseURL}/product/cover`;
  const response = await axios.get(url);
  return response?.data;
};

export const getNewProduct = async () => {
  const url = `${baseURL}/product/new`;
  const response = await axios.get(url);
  return response?.data;
};

export const deleteNewProduct = async (modelId) => {
  const url = `${baseURL}/product/deleteNewProduct/${modelId}`;
  const response = await axios.delete(url);
  return response?.data;
};

export const deleteCoverProduct = async (productId: number) => {
  const url = `${baseURL}/product/deleteCoverProduct/${productId}`;
  const response = await axios.delete(url);
  return response?.data;
};

export const addAttachment = async (postData) => {
  const url = `${baseURL}/attachment/addAttachment`;
  return await axios.post(url, postData);
};

export const getAllProduct = async () => {
  const url = `${baseURL}/product/getAllProduct`;
  return await axios.get(url);
};

export const getDescription = async (desId) => {
  const url = `${baseURL}/product/getDesById/${desId}`;
  return await axios.get(url);
};

export const updateProduct = async (productId, postDataProduct) => {
  const url = `${baseURL}/product/updateProduct/${productId}`;
  return await axios.patch(url, postDataProduct);
};

export const updateDes = async (productId, postData) => {
  const url = `${baseURL}/product/updateDes/${productId}`;
  return await axios.patch(url, postData);
};

export const createProduct = async (postData) => {
  const url = `${baseURL}/product/createProduct`;
  return await axios.post(url, postData);
};

export const createCover = async (postData) => {
  const url = `${baseURL}/product/createCover`;
  return await axios.post(url, postData);
};

export const getAllCategories = async () => {
  const url = `${baseURL}/category/getAllCategories`;
  return await axios.get(url);
};

export const getAllSubCategories = async (categoryId: string | number) => {
  const url = `${baseURL}/subCategory/getAllSubCategories/${categoryId}`;
  return await axios.get(url);
};

export const createFeature = async (postData) => {
  const url = `${baseURL}/feature/createFeature`;
  return await axios.post(url, postData);
};

export const getProductPopular = async () => {
  const url = `${baseURL}/product/popular`;
  return await axios.get(url);
};

export const deletePopularProduct = async (id) => {
  const url = `${baseURL}/product/deletePopularProduct/${id}`;
  const response = await axios.delete(url);
  return response?.data;
};

export const createPopularProduct = async (postData) => {
  const url = `${baseURL}/product/createPopularProduct`;
  return await axios.post(url, postData);
};

export const deleteNormalProduct = async (id) => {
  const url = `${baseURL}/product/deleteNormalProduct/${id}`;
  const response = await axios.delete(url);
  return response?.data;
};
