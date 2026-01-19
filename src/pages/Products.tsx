import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await productApi.getAll(params);
      if (response.success && response.data) {
        setProducts(response.data);
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(response.data.map((p: any) => p.category))
        ) as string[];
        setCategories(uniqueCategories);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-20">
        <div className="text-primary text-xl font-medium">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Our Products</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Explore our wide range of authentic Ayurvedic products</p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.stock === 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                  <p className="text-primary font-bold text-xl">₹{product.price}</p>
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
