import { checkoutService, getMyOrdersService } from "../services/orderService.js";

export const checkout = async (req, res, next) => {
    const user_id = req.user.user_id;
    const cart_id = req.cart_id;
    const { name, phone, address, payment } = req.body;

    try{
        const result = await checkoutService(user_id, cart_id, 
        { customer_name: name.trim(), phone_number: phone.trim(), shipping_address: address.trim(), payment_method: payment }
        );
        res.status(201).json(result);
    }catch(error){
        next(error);
    }
}

export const getMyOrders = async (req, res, next) => {
    try{
        // user_id comes from the verified token, so users only ever see their own orders
        const orders = await getMyOrdersService(req.user.user_id);
        res.status(200).json({ success: true, data: orders });
    }catch(error){
        next(error);
    }
}
