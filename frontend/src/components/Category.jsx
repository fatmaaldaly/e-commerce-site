import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 


export default function Category({ onCategoryClick, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);


  const handleCategoryClick = (categoryName) => {
   navigate(`/shop?category=${encodeURIComponent(categoryName)}`);

  }


  return (
    <div className="category-container p-6">
      <h2 className="category-title text-2xl font-semibold mb-4">All Categories</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.category_id}
            // className="category-card border rounded-2xl shadow-sm hover:shadow-md transition-all p-2 text-center"
            className={`category-card ${selectedCategory === cat.name ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat.name)} 
          >
            <img
              src={cat.image_url || "https://placehold.co/300x200?text=No+Image"}
              alt={cat.name}
              className="category-image w-full h-40 object-cover rounded-xl mb-2"
            />
            <div className="category-name text-lg font-medium">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
