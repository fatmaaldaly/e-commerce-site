import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProductsRequest } from "../services/productService";

export default function BestSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsRequest(1, 4)
      .then((data) => setProducts(data.data.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 pb-40">
      <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-rose-800 mb-8">
        Best Seller
      </h2>
      <ProductCard products={products} />
    </section>
  );
}
