import { getAllCategories, getCategoryById } 
from "../models/categoryModel.js"


export const getAllCategoriesService = async () => {
    return  await getAllCategories();
}


export const getCategoryByIdService = async (id) => {
    return await getCategoryById(id);
}

