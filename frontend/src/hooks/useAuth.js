// custom hook => Cleaner, reusable, scalable

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext);