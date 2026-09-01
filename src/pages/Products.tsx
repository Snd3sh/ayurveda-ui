import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../utils/api";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params =
          selectedCategory !== "all" ? { category: selectedCategory } : {};

        const response = await productApi.getAll(params);

        if (response.success && response.data) {
          setProducts(response.data);

          const uniqueCategories = Array.from(
            new Set(response.data.map((p: any) => p.category)),
          ) as string[];

          setCategories(uniqueCategories);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-primary text-xl font-medium">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================= */}
        {/* PAGE HEADER */}
        {/* ============================= */}

        <div className="text-center mb-14">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-50 dark:bg-gray-800 border border-teal-100 dark:border-gray-700 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-6 transition-colors duration-300">
            <span>🌿</span>
            <span>Natural Ayurvedic Care</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
            Our Products
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Discover authentic Ayurvedic products made with nature, tradition
            and care.
          </p>
        </div>

        {/* ============================= */}
        {/* CATEGORY FILTER */}
        {/* ============================= */}

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {/* All button */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`
              px-6 py-3
              rounded-full
              text-sm
              font-semibold
              transition-all
              duration-300
              active:scale-95
              border
              ${
                selectedCategory === "all"
                  ? `
                    bg-primary
                    text-white
                    border-primary
                    shadow-lg
                    shadow-primary/20
                    -translate-y-0.5
                  `
                  : `
                    bg-white
                    dark:bg-gray-800
                    text-gray-700
                    dark:text-gray-300
                    border-gray-200
                    dark:border-gray-700
                    hover:border-primary
                    hover:text-primary
                    dark:hover:text-teal-300
                  `
              }
            `}
          >
            All Products
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-3
                rounded-full
                text-sm
                font-semibold
                transition-all
                duration-300
                active:scale-95
                border
                ${
                  selectedCategory === category
                    ? `
                      bg-primary
                      text-white
                      border-primary
                      shadow-lg
                      shadow-primary/20
                      -translate-y-0.5
                    `
                    : `
                      bg-white
                      dark:bg-gray-800
                      text-gray-700
                      dark:text-gray-300
                      border-gray-200
                      dark:border-gray-700
                      hover:border-primary
                      hover:text-primary
                      dark:hover:text-teal-300
                    `
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ============================= */}
        {/* PRODUCTS */}
        {/* ============================= */}

        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-5">🌿</div>

            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {products.map((product, index) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
                className="
                  group
                  relative
                  animate-fade-in-up
                  opacity-0
                  [animation-fill-mode:forwards]
                  bg-white
                  dark:bg-gray-800
                  rounded-3xl
                  overflow-hidden
                  border
                  border-gray-200
                  dark:border-gray-700
                  shadow-sm
                  dark:shadow-none
                  hover:shadow-xl
                  hover:shadow-primary/10
                  dark:hover:shadow-black/30
                  hover:border-primary/30
                  hover:-translate-y-1.5
                  transition-all
                  duration-300
                "
              >
                {/* ============================= */}
                {/* IMAGE AREA */}
                {/* ============================= */}

                <div
                  className="
                  relative
                  h-72
                  overflow-hidden
                  bg-gray-50
                  dark:bg-gray-900
                  transition-colors
                  duration-300
                "
                >
                  {/* Category badge */}
                  <div
                    className="
                    absolute
                    top-4
                    left-4
                    z-10
                    px-4
                    py-2
                    rounded-full
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-200
                    dark:border-gray-700
                    text-xs
                    font-semibold
                    text-teal-700
                    dark:text-teal-300
                    shadow-sm
                  "
                  >
                    {product.category}
                  </div>

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="
                      absolute
                      top-4
                      right-4
                      z-10
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      dark:bg-gray-800
                      border
                      border-gray-200
                      dark:border-gray-700
                      flex
                      items-center
                      justify-center
                      text-gray-500
                      dark:text-gray-400
                      hover:text-primary
                      hover:border-primary
                      transition-all
                      duration-200
                      shadow-sm
                    "
                  >
                    ♡
                  </button>

                  {/* Product image */}
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        max-w-full
                        max-h-full
                        object-contain
                        drop-shadow-md
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />
                  </div>

                  {/* Quick-view reveal — slides up on hover/selection */}
                  <div
                    className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    px-4
                    py-3
                    bg-gradient-to-t
                    from-primary/95
                    to-primary/80
                    text-white
                    text-sm
                    font-semibold
                    text-center
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform
                    duration-300
                    ease-out
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                  >
                    <span>Quick View</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>

                  {/* Out of stock */}
                  {product.stock === 0 && (
                    <div
                      className="
                      absolute
                      bottom-4
                      left-4
                      px-3
                      py-1.5
                      rounded-full
                      bg-red-500
                      text-white
                      text-xs
                      font-semibold
                    "
                    >
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* ============================= */}
                {/* PRODUCT INFORMATION */}
                {/* ============================= */}

                <div className="p-6">
                  {/* Product name */}
                  <h3
                    className="
                    text-lg
                    font-bold
                    text-gray-900
                    dark:text-white
                    mb-2
                    group-hover:text-primary
                    transition-colors
                    duration-200
                  "
                  >
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                    text-sm
                    text-gray-600
                    dark:text-gray-400
                    leading-relaxed
                    line-clamp-2
                    mb-5
                  "
                  >
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <p
                      className="
                      text-2xl
                      font-bold
                      text-primary
                    "
                    >
                      Rs {product.price}
                    </p>

                    <span
                      className="
                      text-sm
                      font-semibold
                      text-gray-500
                      dark:text-gray-400
                      group-hover:text-primary
                      transition-colors
                    "
                    >
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
