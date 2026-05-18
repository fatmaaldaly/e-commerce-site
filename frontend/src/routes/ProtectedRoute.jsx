// checks if user is logged in: if yes-show page ,if no-redirect to login page
// navigate: to redirect user to another route
// useLocation: gives info about current page url, used to remember where user wanted to go
// Provides authentication data like token
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();
  
  // if no token, redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        // stores were user wanted to go before being redirected to login
        state={{ from: location }}
        replace
      />
    );
  }
  // if token exists, show the page
  return children;
}
