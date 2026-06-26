import { useCategory } from "../hooks/useCategory";

export default function CategoryList({
  onCategoryClick,
  selectedCategory
}) {
  const { categories, loading } = useCategory();

  if (loading) return <p>Loading...</p>;

  const allCategories = [
    { category_id: 0, name: "All" },
    ...categories,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-rose-800 mb-4">Categories</h2>

      <ul className="flex flex-wrap gap-3">
        {allCategories.map((cat) => (
          <li
            key={cat.category_id}
            onClick={() => onCategoryClick(cat.name)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer select-none transition-all duration-200 ${
              selectedCategory === cat.name
                ? "bg-rose-800 text-white shadow-lg"
                : "bg-white/60 text-rose-800 hover:bg-rose-50 hover:scale-105"
            }`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}