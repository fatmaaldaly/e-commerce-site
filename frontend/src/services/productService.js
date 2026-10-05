import api from "../lib/api";


// categoryId is optional: leave it out to get products from all categories
export const getProductsRequest = async (page = 1, limit = 10, categoryId = null) => {
    const params = { page, limit };
    if (categoryId) params.category_id = categoryId;
    const res = await api.get("/products", { params });
    return res.data;
};
