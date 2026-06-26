import pool from "../../db.js";

export const validateOrder = async (req, res, next) =>{
   

    const user_id = req.user.user_id;
    // ensure user is authenticated
    if(!user_id){
        return res.status(401).json({ error: "unauthorized" });
    }

    try{

    //ensure user has a cart and fetch it
    
    //ensure cart has items
    
     
    //validate each cart item
    //ensure valid quantity and price
   
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