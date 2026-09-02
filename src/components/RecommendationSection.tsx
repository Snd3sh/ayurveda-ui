import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recommendationApi } from "../utils/api";

interface RecommendationSectionProps {
  productId: string;
}

const RecommendationSection = ({ productId }: RecommendationSectionProps) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await recommendationApi.getForProduct(productId, 6);
        if (response.success) setProducts(response.data || []);
      } catch (error) {
        console.error("Failed to load recommendations:", error);
      }
    };
    load();
  }, [productId]);

  if (!products.length) return null;

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          You May Also Like
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Recommended using content similarity between products.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
                {product.name}
              </h3>
              <p className="text-primary font-bold mt-2">Rs{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendationSection;
