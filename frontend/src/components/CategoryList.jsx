import React, { useEffect, useState } from "react";


export default function CategoryList({ onCategoryClick, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  // loads all categories from the backend when the sidebar first shows up
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) =>{
        // Add "All" manually at the start of the list
        const allCategories = [{ category_id: 0, name: "All" }, ...data];
       setCategories(allCategories)})
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
