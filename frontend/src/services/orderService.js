import api from "../lib/api";

// orders of the logged-in user, newest first
export const getMyOrdersRequest = async () => {
  const res = await api.get("/orders");
  return res.data.data;
};
