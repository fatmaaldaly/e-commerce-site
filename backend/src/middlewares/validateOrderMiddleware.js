import pool from "../../db.js";

export const validateOrder = async (req, res, next) =>{
   
    if (!req.user) {
    return res.status(401).json({ error: "You must log in to create an order" });
    }

    const user_id = req.user.user_id;
    // ensure user is authenticated
    if(!user_id){
        return res.status(401).json({ error: "unauthorized" });
    }

    try{

    //ensure user has a cart and fetch it
    const userCart = await pool.query(
        "SELECT cart_id FROM cart WHERE user_id = $1", [user_id]);
    if(userCart.length === 0){
        return res.status(400).json({ error: "Cart not found" });
    }

    //ensure cart has items
    const cart_id = userCart.rows[0].cart_id;
    const cartItems = await pool.query(
        "SELECT * FROM cart_items WHERE cart_id = $1", [cart_id]);
    if(cartItems.rows.length === 0){
        return res.status(400).json({ error: "Cart is empty" });
    }
     
    //validate each cart item
    //ensure valid quantity and price
    for (const item of cartItems.rows) {
        if (item.quantity <= 0) {
            return res.status(400).json({ error: "Invalid quantity in cart" });
        }
        if (item.price <= 0) {
            return res.status(400).json({ error: "Invalid price in cart" });
        }
    }

    // Attach validated cart_id to request object
    // This avoids querying the cart again in the route handler
    req.cart_id = cart_id;

    // Allow the request to continue to the next middleware or controller
    next();

    }catch(err){
        console.error("Error validating order:", err);
        res.status(500).json({ message: "Error validating order" });
    }

}