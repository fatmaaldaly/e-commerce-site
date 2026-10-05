import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { getProductsRequest } from "../services/productService";
import { useCategory } from "../hooks/useCategory";
import "../shop.css";


export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const location = useLocation();
  const { categories, loading: categoriesLoading } = useCategory();

  // Read category from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = (queryParams.get("category") || "").trim();
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
      setPage(1);
    }
  }, [location]);

  // Category name -> id (the API filters by id)
  const categoryId =
    selectedCategory === "All"
      ? null
      : categories.find((c) => c.name === selectedCategory)?.category_id ?? null;

  // Wait for categories before fetching a specific one, otherwise we'd briefly show "All"
  const waitingForCategories = selectedCategory !== "All" && categoriesLoading;

  // Fetch products when the page or category changes.
  // Filtering happens on the server, so it covers every page, not only the current one.
  useEffect(() => {
    if (waitingForCategories) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProductsRequest(page, limit, categoryId);
        setProducts(data.data.data || []);
        setTotalPages(data.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, categoryId, waitingForCategories]);


  const handleCategoryClick = useCallback((category_name) => {
    setSelectedCategory(category_name);
    setPage(1);
  }, []);


  if (loading || waitingForCategories) {
    return (
      <>
        <NavBar />
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          Loading products...
        </h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      {/* Categories on top */}
      <div className="w-full bg-transparent pt-20 md:pt-24">
        <CategoryList
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Products */}
        <div className="w-full">
          {error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <ProductCard products={products} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 mb-20 flex justify-center items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    aria-current={page === pageNumber ? "page" : undefined}
                    className={`px-3 py-1 rounded-md ${
                      page === pageNumber
                        ? "bg-rose-800 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
