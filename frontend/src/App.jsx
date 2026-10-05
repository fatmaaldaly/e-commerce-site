import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Auth = lazy(() => import("./pages/Auth"));
const Success = lazy(() => import("./pages/Success"));
// const Orders = lazy(() => import("./pages/Orders"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));

import Cart from "./components/Cart";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CategoryProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute><Checkout /></ProtectedRoute>
                  } />
                  {/* <Route path="/orders" element={
                    <ProtectedRoute><Orders /></ProtectedRoute>
                  } /> */}
                  <Route path="/success" element={<Success />} />
                  <Route path="/admin" element={
                    <AdminRoute><AdminDashboard /></AdminRoute>
                  } />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </CartProvider>
        </CategoryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
