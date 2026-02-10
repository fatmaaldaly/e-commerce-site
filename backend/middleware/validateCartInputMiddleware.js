export const validateCartInput = (req, res, next) => {
      const { product_id, quantity } = req.body;

      if (!product_id) return res.status(400).json({ error: "product_id required" });

    //   if (!req.user) return res.json({ items: [], message: "Guest cart handled locally" });
      if (!req.user) {
        return res.status(401).json({ error: "Login required to use cart" });
     }


      if (quantity !== undefined) {
        if (!Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            error: "quantity must be 0 or a positive integer",
        });
        }
    }

     next();


};