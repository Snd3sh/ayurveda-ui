import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    itemCount,
    loading,
  } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-primary text-xl font-medium">
              Loading cart...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start adding products to your cart
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
              {cart.map((item) => (
                <div key={item.product} className="flex items-center gap-6 p-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-primary font-bold text-lg">
                      Rs{item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product, item.quantity - 1)
                      }
                      className="w-10 h-10 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product, item.quantity + 1)
                      }
                      className="w-10 h-10 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-lg w-24 text-right text-gray-900 dark:text-white">
                    Rs{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="text-red-500 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Items ({itemCount})</span>
                  <span className="font-medium">Rs{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-medium">Rs50</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-primary">Rs{totalPrice + 50}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
