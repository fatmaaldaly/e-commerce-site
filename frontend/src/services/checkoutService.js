import api from "../lib/api";

const checkout = async (data) => {
  const res = await api.post("/orders/checkout", data);
  return res.data;
};

export default checkout;