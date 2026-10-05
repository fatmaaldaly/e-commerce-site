import { dbGetAllProducts, dbCountProducts } from "../models/productModel.js";


export const getAllProductsService = async (page, limit, category_id = null) => {
    // how many rows to skip
    const offset = (page - 1) * limit;
    const [totalProducts, products] = await Promise.all([
      dbCountProducts(category_id),
      dbGetAllProducts(limit, offset, category_id),
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
