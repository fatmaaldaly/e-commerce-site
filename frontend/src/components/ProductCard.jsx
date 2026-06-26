
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
    <div className="w-full">
      {list.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((product) => {
            const quantity = getQuantity(product.product_id);
            return (
              <div
                key={product.product_id}
                className="group bg-white/70 backdrop-blur-sm border border-rose-100 rounded-2xl p-4 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-56 md:h-60 object-cover rounded-xl mb-4 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="mb-2">
                  <h3 className="text-lg font-serif font-semibold text-rose-800 hover:underline">{product.name}</h3>
                </div>

                <p className="text-sm font-medium text-black mb-3">EGP {product.price}</p>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full">
                    <button
                      className="w-8 h-8 rounded-full bg-white border border-amber-100 flex items-center justify-center text-lg font-bold hover:shadow-md transition"
                      onClick={() => handleDecrease(product)}
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center font-semibold">{quantity}</span>

                    <button
                      className="w-8 h-8 rounded-full bg-white border border-amber-100 flex items-center justify-center text-lg font-bold hover:shadow-md transition"
                      onClick={() => handleIncrease(product)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="relative overflow-hidden px-5 py-2 rounded-full font-semibold text-rose-900 bg-linear-to-r from-pink-50 via-rose-100 to-amber-50 shadow-md hover:scale-[1.02] transition-all duration-300"
                    onClick={() => handleIncrease(product)}
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-50 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700" aria-hidden></span>
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}

