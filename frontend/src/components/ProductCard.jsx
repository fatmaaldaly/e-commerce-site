
import { useCart } from "../hooks/useCart";

export default function ProductCard({ products = [] }) {
  const list = Array.isArray(products) ? products : [];
  const { cart, addToCart, updateQuantity } = useCart();


  // Get quantity from cart 
  const getQuantity = (productId) => {
    const item = cart.find((i) => i.product_id === productId);
    return item ? item.quantity : 0;
  };



  const handleIncrease = (product) => {
    const currentQty = getQuantity(product.product_id);

    if (currentQty === 0) {
      addToCart(product); 
    } else {
      updateQuantity(product.product_id, currentQty + 1);
    }
  };

  const handleDecrease = (product) => {
    const currentQty = getQuantity(product.product_id);

    if (currentQty <= 1) {
      updateQuantity(product.product_id, 0); // remove
    } else {
      updateQuantity(product.product_id, currentQty - 1);
    }
  };


  return (
    <main className="shop-products">
      {list.length > 0 ? (
        <div className="product-grid">
          {list.map((product) => {
            const quantity = getQuantity(product.product_id);
            return (
              <div key={product.product_id} className="product-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                className="product-image"
              />

              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">$ {product.price}</p>
              </div>

              <div className="product-footer">
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecrease(product)}
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => handleIncrease(product)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="add-to-cart"
                  onClick={() => handleIncrease(product)}
                >
                  Add
                </button>

              </div>
            </div>
          );
        })};
        </div>
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </main>
  );
}

