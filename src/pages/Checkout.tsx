import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { authApi, orderApi } from "../utils/api";

const SHIPPING_FEE = 100;

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash_on_delivery" | "paypal"
  >("paypal");
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

  useEffect(() => {
    const loadUser = async () => {
      const auth = await authApi.getMe();
      if (!auth.authenticated) {
        navigate("/login", { replace: true });
        return;
      }
      setFormData((current) => ({
        ...current,
        fullName: auth.user?.name || current.fullName,
        email: auth.user?.email || current.email,
      }));
      setAuthLoading(false);
    };
    loadUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.city !== "Kathmandu" && formData.city !== "Pokhara") {
      setCityError("Delivery is only available in Kathmandu and Pokhara");
      return;
    }

    if (formData.country !== "Nepal") {
      alert("We currently only deliver within Nepal.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/products");
      return;
    }

    setLoading(true);

    try {
      // IMPORTANT: do not send prices, totals, or user identity as trusted values.
      // The backend gets the authenticated user from the JWT and calculates all prices.
      const response = await orderApi.create({
        orderItems: cart.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        shippingAddress: formData,
        paymentMethod,
      });

      if (response.success && response.data) {
        if (paymentMethod === "paypal" && response.data.approvalUrl) {
          // Stock is reserved by the server before payment initiation.
          // PayPal payment is captured and verified by the backend before the order is marked paid.
          clearCart();
          window.location.href = response.data.approvalUrl;
          return;
        }

        clearCart();
        navigate(`/order-confirmation/${response.data._id}`);
      } else {
        alert(
          response.message ||
            response.error ||
            "Failed to create order. Please try again.",
        );
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (name === "city") {
      setCityError(
        value && value !== "Kathmandu" && value !== "Pokhara"
          ? "Delivery is only available in Kathmandu and Pokhara"
          : "",
      );
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-primary text-xl font-medium">
          Checking your account...
        </div>
      </div>
    );
  }

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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email is taken from your authenticated account.
                  </p>
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${cityError ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
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
                      placeholder="e.g., Bagmati, Gandaki"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value="Nepal"
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${paymentMethod === "paypal" ? "border-primary bg-teal-50 dark:bg-teal-900/20" : "border-gray-200 dark:border-gray-700"}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          PayPal Sandbox
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Pay securely through the PayPal test environment.
                        </p>
                      </div>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${paymentMethod === "cash_on_delivery" ? "border-primary bg-teal-50 dark:bg-teal-900/20" : "border-gray-200 dark:border-gray-700"}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={paymentMethod === "cash_on_delivery"}
                        onChange={() => setPaymentMethod("cash_on_delivery")}
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Pay when your order is delivered.
                        </p>
                      </div>
                    </label>
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
                  <span className="font-medium">Rs{SHIPPING_FEE}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-primary">
                    Rs{totalPrice + SHIPPING_FEE}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Final prices, shipping, tax, stock and payment amount are
                validated by the server.
              </p>
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 disabled:opacity-50 shadow-md"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "paypal"
                    ? "Continue to PayPal"
                    : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
