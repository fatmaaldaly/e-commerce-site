import api from "../lib/api";

// get all categories
export const getCategories = async () => {
   console.trace("getCategories called")
  const res = await api.get("/categories");
  return res.data;
};

// get products by category id
export const getProductsByCategoryId = async (category_id) => {
  const res = await api.get(`/categories/${category_id}/products`);
  return res.data;
};