
import { useCategory } from "@/hooks/useCategory";
import { useNavigate } from "react-router-dom";

export default function Category({ selectedCategory }) {
  const navigate = useNavigate();
  const { categories = [] } = useCategory();

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 pt-20">
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-rose-800 text-left mb-10">
       Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.category_id}
            onClick={() => handleCategoryClick(cat.name)}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              selectedCategory === cat.name
                ? "scale-105"
                : "hover:translate-y-1"
            }`}
          >
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md transition-transform duration-500 ${
              selectedCategory === cat.name
                ? "ring-4 ring-rose-200"
                : "group"
            }`}>
              <img
                src={
                  cat.image_url ||
                  "https://placehold.co/300x300?text=No+Image"
                }
                alt={cat.name}
                className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105`}
              />
            </div>

            <span className="mt-4 text-lg font-medium text-rose-800 text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}