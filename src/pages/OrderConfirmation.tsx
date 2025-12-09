import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { orderApi } from '../utils/api';

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      setLoading(true);
      const response = await orderApi.getById(id);
      if (response.success && response.data) {
        setOrder(response.data);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4 text-lightText">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your order ID is: <strong>{order._id}</strong>
          </p>

          <div className="text-left bg-emerald-50 p-6 rounded-lg mb-6">
            <h2 className="font-bold text-lg mb-4 text-lightText">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold text-primary">₹{order.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold capitalize">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="capitalize">{order.paymentMethod.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          <div className="text-left mb-6">
            <h2 className="font-bold text-lg mb-4 text-lightText">Shipping Address</h2>
            <p className="text-gray-600">
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
