import { checkoutService } from "../services/orderService.js";

export const checkout = async (req, res, next) => {
    const user_id = req.user.user_id;
    const cart_id = req.cart_id;
    console.log("BODY:", req.body);
    const { name, phone, address, payment } = req.body;

    try{
        const result = await checkoutService(user_id, cart_id, 
        { customer_name: name, phone_number: phone, shipping_address: address, payment_method: payment }
        );
        res.status(201).json(result);
    }catch(error){
        next(error);
    }
}