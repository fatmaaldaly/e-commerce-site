import {
  getAllCategories,
  getCategoryById,
  getProductsByCategoryId
} from "../models/categoryModel.js";

import { AppError } from "../utils/AppError.js";


// Get all categories
export const getAllCategoriesService = async () => {
  return await getAllCategories();
};

// Get category + its products
export const getCategoryProductsService = async (category_id) => {

  // fetch in parallel (performance optimization)
  const [category, products] = await Promise.all([
    getCategoryById(category_id),
    getProductsByCategoryId(category_id)
  ]);

  // business rule: category must exist
  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return {
    data: {
    category,
    products
  }
  };
};

// how data is returned
//  {
//   "category": {
//     "id": 1,
//     "name": "Electronics"
//   },
//   "products": [
//     {
//       "product_id": 10,
//       "name": "Laptop",
//       "price": 1000,
//       "category_id": 1
//     },
//     ...
//   ]
// }