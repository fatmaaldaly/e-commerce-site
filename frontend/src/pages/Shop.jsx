import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { useCart } from "../hooks/useCart";
import { getProductsRequest } from "../services/productService";

import "../shop.css";


export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const location = useLocation();

  const { addToCart } = useCart();

  // Read category from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const categoryFromURL = decodeURIComponent(
      queryParams.get("category") || ""
    );

    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [location]);




  // Fetch products when page changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProductsRequest(page, limit);
        console.log("shop data: ", data.data.data);
        setProducts(data.data.data || []);          
        
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);


  // Filter products by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category_name === selectedCategory
      );

      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);


  const handleCategoryClick = (category_name) => {
    setSelectedCategory(category_name);
    setPage(1);
  };
  useEffect(() => {
}, [products, filteredProducts]);

  if (loading) {
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
          <ProductCard products={filteredProducts} addToCart={addToCart} />

          {/* Pagination */}
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
                  className={`px-3 py-1 rounded-md ${
                    page === pageNumber
                      ? "bg-pink-500 text-white"
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
        </div>
      </main>

      <Footer />
    </>
  );
}