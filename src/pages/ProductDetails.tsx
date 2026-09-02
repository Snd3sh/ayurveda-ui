import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, CheckCircle2 } from "lucide-react";
import { productApi } from "../utils/api";
import { useCart } from "../hooks/useCart";
import RecommendationSection from "../components/RecommendationSection";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      const response = await productApi.getById(id);
      if (response.success && response.data) {
        setProduct(response.data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
        },
        quantity,
      );
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/cart");
      }, 1000);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401) {
        alert("Please login to add items to cart.");
        navigate("/login");
      } else {
        alert("Failed to add item to cart. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-20">
        <div className="text-primary text-xl font-medium">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-20">
        <div className="text-red-500 text-xl font-medium">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-12">
            <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full min-h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h1 className="font-serif text-4xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-primary mb-6">
                  Rs{product.price}
                </p>
              </div>
              <div>
                <span className="inline-block bg-teal-50 dark:bg-teal-900/20 text-secondary dark:text-teal-200 px-4 py-2 rounded-lg text-sm font-semibold border border-teal-100 dark:border-teal-800/50">
                  {product.category}
                </span>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div>
                <label className="block font-semibold mb-3 text-gray-900 dark:text-white">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary/40 active:scale-90 transition-all duration-150 font-semibold"
                  >
                    -
                  </button>
                  <span
                    key={quantity}
                    className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center animate-pop-in"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary/40 active:scale-90 transition-all duration-150 font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
              {product.stock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  disabled={showSuccess}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg disabled:cursor-not-allowed active:scale-[0.98] ${
                    showSuccess
                      ? "bg-maroon-500 text-white"
                      : "bg-primary text-white hover:bg-secondary disabled:opacity-50"
                  }`}
                >
                  {showSuccess ? (
                    <span className="flex items-center animate-pop-in">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Added to Cart!
                    </span>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-4 rounded-xl font-semibold cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>

        {product && <RecommendationSection productId={product._id} />}
      </div>
    </div>
  );
};

export default ProductDetails;
