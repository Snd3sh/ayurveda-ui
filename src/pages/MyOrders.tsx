import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Eye } from "lucide-react";
import { authApi, orderApi } from "../utils/api";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const auth = await authApi.getMe();
        if (!auth.authenticated) {
          navigate("/login", { replace: true });
          return;
        }
        const response = await orderApi.getMy();
        if (response.success) setOrders(response.data || []);
        else setError(response.message || "Unable to load your orders.");
      } catch (err: any) {
        setError(err.response?.data?.message || "Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [navigate]);

  const statusClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-primary text-xl">Loading your orders...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Orders
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Only orders belonging to your account are shown here.
            </p>
          </div>
          <Link
            to="/products"
            className="bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-secondary"
          >
            Continue Shopping
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No orders yet
            </h2>
            <p className="text-gray-500 mt-2">
              Your completed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm text-gray-500">
                      #{order._id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isPaid ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 my-5" />
                <div className="space-y-2">
                  {order.orderItems?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>Rs{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Total:{" "}
                    <span className="text-primary">Rs{order.totalPrice}</span>
                  </span>
                  <button
                    onClick={() => navigate(`/order-confirmation/${order._id}`)}
                    className="flex items-center gap-2 text-primary font-semibold hover:text-secondary"
                  >
                    <Eye className="w-4 h-4" /> View Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
