import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ShoppingBag, DollarSign, LogOut, Home } from "lucide-react";
import { productApi, orderApi, authApi } from "../utils/api";
import { clearAuthCache } from "../utils/adminAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          productApi.getAll(),
          orderApi.getAll(),
        ]);

        const products = productsRes.success ? productsRes.data || [] : [];
        const orders = ordersRes.success ? ordersRes.data || [] : [];
        const revenue = orders.reduce(
          (sum: number, order: any) => sum + (order.totalPrice || 0),
          0,
        );

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = async () => {
    await authApi.logout();
    clearAuthCache();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg">
      <div className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 hover:text-accent transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-accent transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-lightText">
                  {stats.totalProducts}
                </p>
              </div>
              <Package className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-lightText">
                  {stats.totalOrders}
                </p>
              </div>
              <ShoppingBag className="w-12 h-12 text-secondary" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-lightText">
                  Rs{stats.totalRevenue}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-accent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-emerald-100"
          >
            <div className="flex items-center space-x-4">
              <Package className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-lightText">
                  Manage Products
                </h3>
                <p className="text-gray-600">Add, edit, or delete products</p>
              </div>
            </div>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-emerald-100"
          >
            <div className="flex items-center space-x-4">
              <ShoppingBag className="w-12 h-12 text-secondary" />
              <div>
                <h3 className="text-xl font-bold text-lightText">
                  Manage Orders
                </h3>
                <p className="text-gray-600">View and update order status</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
