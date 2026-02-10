import pool from "../index.js";

export const getUserCart = async (req, res, next) => {
    /*
    Ensures:
    - The authenticated user has a cart
    - Creates one if it does not exist
    - Attaches cart_id to req.cart_id
  */

    const user_id = req.user.user_id || req.user.id; // Handle different user object structures
    console.log("Authenticated user ID:", user_id);

    if(!user_id){
        return res.status(401).json({ error: "Authentication required to access cart." });
    }

    try{
        const cartRes = await pool.query(
            "SELECT cart_id FROM cart WHERE user_id = $1",
            [user_id]
        );

        if(cartRes.rows.length === 0){
            const newCart = await pool.query(
            "INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id",
            [user_id]
          );

          req.cart_id = newCart.rows[0].cart_id;
        }else{
            req.cart_id = cartRes.rows[0].cart_id;
        }
        
        console.log("Cart ID:", req.cart_id);
        next();

    }catch(err){
        console.error("Get cart middleware error:", err);
        res.status(500).json({message: "Internal server error" });


    }


};