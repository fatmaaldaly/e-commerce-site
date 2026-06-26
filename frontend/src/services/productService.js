import api from "../lib/api";


export const getProductsRequest = async (page = 1, limit = 10) => {
    const res = await api.get(`/products?page=${page}&limit=${limit}`);
    console.log(res.data.data);
    return res.data;

}