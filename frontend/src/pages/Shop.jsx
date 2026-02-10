import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../shop.css";


export default function Shop() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // products per page
  const location = useLocation();
  const { addToCart } = useCart();


  // Read the category from URL query parameter, Runs every time the URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = decodeURIComponent(queryParams.get("category") || "");

    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [location]);


  // Fetch products
    useEffect(() => {
    fetch(`http://localhost:5000/api/products?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);       
        setFilteredProducts(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error("Error fetching products:", err));
    }, [page]);



  // runs whenever selectedCategory or products changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (p) => p.category_name === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);


  // Updates the selected category when you click a button in the sidebar
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    // reset page when category changes
    setPage(1); 
  };


  return (
    <>
     <NavBar />
      <div className="shop-content">
         
        {/* Sidebar */}
        <aside className="shop-sidebar">
          
          <CategoryList
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
          />
        </aside>

        {/* Product Grid */}
        {/* <ProductCard products={filteredProducts} addToCart={addToCart} /> */}


        {/* Pagination */}
        {/* <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={page === pageNumber ? "active" : ""}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
        
        </div> */}

        {/* Products Section */}
        <div className="shop-products">

          {/* Product Grid */}
          <ProductCard
            products={filteredProducts}
            addToCart={addToCart}
          />

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={page === pageNumber ? "active" : ""}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>

        </div>



     
      </div>
    <Footer />
   </>
  );
}
