import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


export default function Shop() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
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
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); 
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);


  // Apply filtering whenever selectedCategory change
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
        <ProductCard products={filteredProducts} addToCart={addToCart} />
     
      </div>
         <Footer />
   </>
  );
}
