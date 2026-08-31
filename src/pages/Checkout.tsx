import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { orderApi } from "../utils/api";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nepal",
    phone: "",
    email: "",
  });
  const [cityError, setCityError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate city
    if (formData.city !== "Kathmandu" && formData.city !== "Pokhara") {
      setCityError("Delivery is only available in Kathmandu and Pokhara");
      return;
    }

    if (formData.country !== "Nepal") {
      alert("We currently only deliver within Nepal.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item.product,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        shippingAddress: formData,
        paymentMethod: "cash_on_delivery",
        itemsPrice: totalPrice,
        shippingPrice: 50,
        taxPrice: 0,
        totalPrice: totalPrice + 50,
        user: {
          name: formData.fullName,
          email: formData.email,
        },
      };

      const response = await orderApi.create(orderData);
      if (response.success && response.data) {
        clearCart();
        navigate(`/order-confirmation/${response.data._id}`);
      } else {
        const errorMessage =
          response.message ||
          response.error ||
          "Failed to create order. Please try again.";
        alert(errorMessage);
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "An error occurred. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate city
    if (name === "city") {
      if (value && value !== "Kathmandu" && value !== "Pokhara") {
        setCityError("Delivery is only available in Kathmandu and Pokhara");
      } else {
        setCityError("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Shipping Address
              </h2>

              {/* Delivery Notice */}
              <div className="mb-8 p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl">
                <p className="text-sm text-teal-800 dark:text-teal-300">
                  <strong>Delivery Information:</strong> We currently deliver
                  only within Nepal, specifically to <strong>Kathmandu</strong>{" "}
                  and <strong>Pokhara</strong>.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                      City *
                    </label>
                    <select
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ${
                        cityError
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      <option value="">Select City</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Pokhara">Pokhara</option>
                    </select>
                    {cityError && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {cityError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                      placeholder="e.g., Bagmati, Gandaki"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Items ({cart.length})</span>
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
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
