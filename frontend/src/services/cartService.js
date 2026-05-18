const API_URL = "http://localhost:5000/api/cart";

export const getCartRequest = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addToCartRequest = async (productId, token) => {
  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity: 1 }),
  });
};

export const updateQuantityRequest = async (productId, quantity, token) => {
  await fetch(`${API_URL}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
};

// export const removeFromCartRequest = async (productId, token) => {
//   await fetch(`${API_URL}/remove/${productId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

export const clearCartRequest = async (token) => {
  await fetch(`${API_URL}/clear`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};