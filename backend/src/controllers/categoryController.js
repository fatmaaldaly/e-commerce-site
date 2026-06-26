import {
  getAllCategoriesService,
  getCategoryProductsService
} from "../services/categoryService.js";


export const getAllCategories = async (req, res, next) => {
  try {
    const data = await getAllCategoriesService();

    res.status(200).json({success: true, data});

  } catch (error) {
    next(error);
  }
};


export const getProductsByCategoryId = async (req, res, next) => {
  try {
    const { category_id } = req.params;

    const data = await getCategoryProductsService(category_id);

    res.status(200).json({success: true, data});
// controller wraps it this way, as a json response
// {
//   "success": true,
//   "data": {
//     "category": {...},
//     "products": [...]
//   }
// }

  } catch (error) {
    next(error);
  }
};