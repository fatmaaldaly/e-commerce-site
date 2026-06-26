import { dbGetAllProducts, dbCountProducts } from "../models/productModel.js";


export const getAllProductsService = async (page, limit) => {
    // how many rows to skip
    const offset = (page - 1) * limit;
    // const totalProducts = await dbCountProducts();
    const [totalProducts, products] = await Promise.all([
    dbCountProducts(),
    dbGetAllProducts(limit, offset)
  ]);
  const totalPages = Math.ceil(totalProducts / limit);
    
    return {
      total: totalProducts,
      page,
      limit,
      totalPages,
      data: products,
    };

}