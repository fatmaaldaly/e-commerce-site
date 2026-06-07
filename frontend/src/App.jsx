import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./context/AuthContext";
import Success from "./pages/Success";
import ProtectedRoute from "./routes/ProtectedRoute";



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop /> 
          {/* <NavBar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<ProtectedRoute>
              <Checkout />
            </ProtectedRoute> }/>
            <Route path="/success" element={<Success />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </CartProvider>
      </AuthProvider>
      
  );
}

export default App;
