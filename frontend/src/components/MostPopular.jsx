import ProductCard from "./ProductCard";

import img1 from "../assets/best-seller/Divine cream.webp";
import img2 from "../assets/best-seller/Fit-Me-Foundation-104-Soft.webp";
import img3 from "../assets/best-seller/Libre Berry Crush.jpg";
import img4 from "../assets/best-seller/Plum Peptide Booster 2000s.webp";

const best = [
  {
    product_id: 1,
    name: "Divine Cream",
    price: 1200,
    image_url: img1,
  },
  {
    product_id: 2,
    name: "Fit Me Matte & Poreless Foundation",
    price: 550,
    image_url: img2,
  },
  {
    product_id: 3,
    name: "Libre Berry Crush Women Perfume (90ml)",
    price: 450,
    image_url: img3,
  },
  {
    product_id: 4,
    name: "Plum Peptide Booster 2000s",
    price: 950,
    image_url: img4,
  },
];

export default function MostPopular() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 pb-40">
      <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-rose-800 mb-8">
        Best Seller
      </h2>

      <ProductCard products={best} />
    </section>
  );
}