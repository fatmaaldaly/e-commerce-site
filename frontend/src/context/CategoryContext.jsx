import { createContext, useState, useEffect, useCallback} from "react";
import { getCategories } from "../services/categoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchCategories = useCallback(async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getCategories();
    // trim names: stray whitespace in the DB (e.g. "Perfume\n") breaks matching
    setCategories((data.data || []).map((c) => ({ ...c, name: c.name.trim() })));
  } catch (err) {
    setError(err.response?.data?.message || "Failed to load categories");
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