import img1 from "../assets/brand/loreal.png";
import img2 from "../assets/brand/maybelline.png";
import img3 from "../assets/brand/rarebeauty.png";
import img4 from "../assets/brand/saint-laurent.jpg";

const brands = [
  {
    id: 1,
    image: img1,
  },
  {
    id: 2,
    image: img2,
  },
  {
    id: 3,
    image: img3,
  },
  {
    id: 4,
    image: img4,
  },
];

export default function BrandSection() {
  return (
 
  <section className="max-w-7xl mx-auto px-4 py-12">
   <h2 className="text-3xl font-serif font-semibold text-rose-800 mb-8">
        Brands
      </h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {brands.map((brand) => (
      <div
        key={brand.id}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-white/60 rounded-xl shadow-sm p-3">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-full object-contain"
          />
        </div>

        <span className="mt-4 text-lg font-medium text-rose-800 text-center">
          {brand.name}
        </span>
      </div>
    ))}
  </div>
</section>
  
  );
}