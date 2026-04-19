import axios from "axios";

const BASE_URL = "https://dummyjson.com";

// ✅ GET ALL PRODUCTS
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.log("Error fetching products", error);
    return { products: [] };
  }
};

// ✅ GET SINGLE PRODUCT
export const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching product", error);
    return null;
  }
};