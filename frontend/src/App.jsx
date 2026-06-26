import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryContext";
import Success from "./pages/Success";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
     <CategoryProvider>
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop /> 
          {/* <NavBar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/login" element={<Auth />} />
            <Route path="/checkout" element={<ProtectedRoute>
              <Checkout />
            </ProtectedRoute> }/>
            <Route path="/success" element={<Success />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </CartProvider>
      </CategoryProvider>
      </AuthProvider>
      
  );
}

export default App;
