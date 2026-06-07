import api from "../lib/api";


export const getCartRequest = async () => {
  const data = await api.get("/cart");
  return data.data;
  
};

export const addToCartRequest = async (product_id) => {
  await api.post(`/cart/add`, {product_id, quantity: 1});
};

export const updateQuantityRequest = async (product_id, quantity) => {
  await api.patch(`/cart/update`, { product_id, quantity })
};

export const removeFromCartRequest = async (product_id) => {
  await api.delete(`/cart/${product_id}`);
};

export const clearCartRequest = async () => {
  await api.delete(`/cart/clear`);
};