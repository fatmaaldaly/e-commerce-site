import { getAllProductsService } from "../services/productService.js";


export const getAllProducts = async (req, res, next) => {
    try{
    //pagination
    //page number, default is 1
    //const page = parseInt(req.query.page) || 1;
    //items per page
    //const limit = parseInt(req.query.limit) || 10;
    //const data = await getAllProductsService(page, limit);
     
     const page = Number(req.query.page);
     const limit = Number(req.query.limit);
     const safePage = Number.isInteger(page) && page > 0 ? page : 1;
     const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;
     const data = await getAllProductsService(safePage, safeLimit);

     return res.status(200).json({success: true, data});


    }catch(error){
        next(error);
    }
}