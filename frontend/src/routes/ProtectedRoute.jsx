// import { useAuth } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const { token } = useAuth();

//   if (!token) {
//     localStorage.setItem("redirect_after_login", window.location.pathname);
//     return <Navigate to="/login" />;
//   }

//   return children;
// }
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    // Redirect to login and remember where the user wanted to go
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
