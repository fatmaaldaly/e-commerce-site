import { getAllProducts, countProducts } from "../models/productModel.js";

export const getAllProductsService = async (page, limit) => {
    // how many rows to skip
    const offset = (page - 1) * limit;
    const totalProducts = await countProducts();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await getAllProducts(limit, offset);
    
    return {
      total: totalProducts,
      page,
      limit,
      totalPages,
      data: products,
    };

}