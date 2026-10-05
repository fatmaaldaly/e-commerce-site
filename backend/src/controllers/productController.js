import { getAllProductsService } from "../services/productService.js";
import { AppError } from "../utils/appError.js";

const MAX_LIMIT = 50;

export const getAllProducts = async (req, res, next) => {
    try{
     // pagination: ?page=1&limit=10, optional filter: ?category_id=2
     const page = Number(req.query.page);
     const limit = Number(req.query.limit);
     const safePage = Number.isInteger(page) && page > 0 ? page : 1;
     const safeLimit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, MAX_LIMIT) : 10;

     let categoryId = null;
     if (req.query.category_id !== undefined) {
       categoryId = Number(req.query.category_id);
       if (!Number.isInteger(categoryId) || categoryId <= 0) {
         throw new AppError("category_id must be a positive integer", 400);
       }
     }

     const data = await getAllProductsService(safePage, safeLimit, categoryId);

     return res.status(200).json({success: true, data});

    }catch(error){
        next(error);
    }
}
