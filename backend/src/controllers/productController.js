import { getAllProductsService } from "../services/productService.js";


export const getAllProducts = async (req, res, next) => {
    try{
     //pagination
     //page number, default is 1
     const page = parseInt(req.query.page) || 1;
     //items per page
     const limit = parseInt(req.query.limit) || 10;
     const data = await getAllProductsService(page, limit);
     return res.status(200).json(data);

    }catch(error){
        next(error);
    }
}