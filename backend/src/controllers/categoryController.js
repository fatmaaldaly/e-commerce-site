import { getAllCategoriesService, getCategoryByIdService } 
from "../services/categoryService.js";


export const getAllCategories = async (req, res, next) => {
    try{
        const data = await getAllCategoriesService();
        res.status(200).json(data);
    
    } catch (error) {
        next(error);
    }
}


export const getCategoryById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const data = await getCategoryByIdService(id);
        res.status(200).json(data);
    
    } catch(error){
        next(error);
    }
}