import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { productApi } from '../utils/api';
import { useCart } from '../hooks/useCart';

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
      await addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
      }, quantity);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/cart');
      }, 1000);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        alert('Please login to add items to cart.');
        navigate('/login');
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-primary text-xl font-semibold">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 text-xl font-semibold">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-primary hover:text-secondary transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-6">₹{product.price}</p>
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
              </div>
              <div className="mb-6">
                <span className="inline-block bg-emerald-100 dark:bg-emerald-900 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-3 text-gray-900 dark:text-white">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-primary text-primary rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border-2 border-primary text-primary rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              {product.stock > 0 ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    disabled={showSuccess}
                    className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {showSuccess ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-4 rounded-lg font-semibold cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
