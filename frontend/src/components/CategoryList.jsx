import React, { useEffect, useState } from "react";


export default function CategoryList({ onCategoryClick, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="category-list-container">
      <h2 className="category-list-title">Categories</h2>
      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat.category_id}
            className={`category-list-item ${selectedCategory === cat.name ? "active" : ""}`}
            onClick={() => onCategoryClick && onCategoryClick(cat.name)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
