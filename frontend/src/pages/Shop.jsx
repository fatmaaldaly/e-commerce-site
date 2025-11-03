import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation();
  const { addToCart } = useCart();

  // Read the category from URL query parameter
  // Run the code inside every time the URL/location changes.
  useEffect(() => {
    // gives the part of the URL after ? (for ex ?category=Electronics)
    // new URLSearchParams(...) turns that ? string into an object you can easily ask for values from.
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



  // Apply filtering whenever selectedCategory or products change
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

  // Handle sidebar category click
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };


  return (

      <div className="shop-content">
        {/* Sidebar */}
        
        <aside className="shop-sidebar">
          
          <CategoryList
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
          />
        </aside>

        {/* Product Grid */}
      <main className="shop-products">
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.product_id} className="product-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                  
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart" onClick={() => addToCart(product)} >Add</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </main>
      </div>

  );
}
