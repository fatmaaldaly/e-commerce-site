import { createCart, getUserCart } from "../models/cartModel.js";
import { AppError } from "../utils/appError.js";


export const validateCart = async (req, res, next) => {
    /*
    Ensures:
    - The authenticated user has a cart
    - Creates one if it does not exist
    - Attaches cart_id to req.cart_id
  */

    const user_id = req.user.user_id;
    if(!user_id){
        return next(new AppError("Unauthorized", 401));
    }

    try{
      let cart = await getUserCart(user_id);
      if(!cart){
          cart = await createCart(user_id);
      }
      req.cart_id = cart.cart_id;
      next();

    }catch(err){
      next(err);
    }

};


const isPositiveInt = (value) => Number.isInteger(value) && value > 0;


// POST /cart/add — quantity is optional and defaults to 1
export const validateCartInput = (req, res, next) => {
      const { product_id, quantity } = req.body;

      if (!isPositiveInt(product_id)) {
        return next(new AppError("product_id must be a positive integer", 400));
      }

      if (quantity !== undefined && !isPositiveInt(quantity)) {
        return next(new AppError("quantity must be a positive integer", 400));
      }

      req.body.quantity = quantity ?? 1;
      next();
};


// PATCH /cart/update — both fields required
export const validateCartUpdate = (req, res, next) => {
      const { product_id, quantity } = req.body;

      if (!isPositiveInt(product_id)) {
        return next(new AppError("product_id must be a positive integer", 400));
      }

      if (!isPositiveInt(quantity)) {
        return next(new AppError("quantity must be a positive integer", 400));
      }

      next();
};


// DELETE /cart/:product_id
export const validateProductIdParam = (req, res, next) => {
      const id = Number(req.params.product_id);

      if (!isPositiveInt(id)) {
        return next(new AppError("product_id must be a positive integer", 400));
      }

      next();
};
