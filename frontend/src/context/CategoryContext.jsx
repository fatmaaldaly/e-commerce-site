import { createContext, useState, useEffect, useCallback} from "react";
import { getCategories } from "../services/categoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
   console.count("CategoryProvider render");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchCategories = useCallback(async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getCategories();
    setCategories(data.data || []);
  } catch (err) {
    setError(err.response?.data?.error || "Failed to load categories");
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;