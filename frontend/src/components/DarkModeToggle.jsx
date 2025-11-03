import React, { useEffect, useState } from "react";
import "../style.css"


export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <label className="switch">
      <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
      <span className="slider"></span>
    </label>
  );
}
