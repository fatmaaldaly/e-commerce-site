import "../style.css";
import { useCart } from "../hooks/useCart";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function Cart({isOpen, onClose}) {
  const { cart, clearCart, total,  updateQuantity } = useCart();
  const navigate = useNavigate();
  // const location = useLocation();
  const { token } = useAuth(); 
  

  const handleCheckout = () => {
    if (!token) {
      navigate("/login", {
        state: { from: "checkout" }
      });
    } else {
      navigate("/checkout");
    }
  };



  
  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-cart-btn" onClick={onClose}>
        ✕
      </button>

      <h2 style={{marginTop:20, marginBottom:20}}>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (

        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item.product_id} className="cart-item">
              <img
                src={item.image_url}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>EGP{item.price}</p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={()=> updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={()=> updateQuantity(item.product_id, item.quantity + 1)}>+</button>
              </div>

              {/* <div className="cart-item-price">
                {item.price && item.quantity
                ? `EGP ${(item.price * item.quantity).toFixed(2)}`
                : "EGP 0.00"}
              </div> */}

              {/* <button
                className="remove-btn"
                onClick={() => removeFromCart(item.product_id)}
              >
                ✕
              </button> */}
            </li>
          ))}
     </ul>

      )}

      <div className="cart-total">
        <h3>Total: EGP {total.toFixed(2)}</h3>
      </div>



      {cart.length > 0 && (
         <>
        <button
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>

        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
         </>
      )}
      
    </div>

   
  );
}
