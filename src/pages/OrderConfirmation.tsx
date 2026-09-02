import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  ShoppingBag,
  User,
  MapPin,
  Building2,
  Globe2,
  Phone,
  ClipboardList,
  CreditCard,
} from "lucide-react";
import { orderApi } from "../utils/api";

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await orderApi.getById(id);
        if (response.success && response.data) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffcf6] dark:bg-[#1c130d]">
        <div className="text-primary text-xl font-medium">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffcf6] dark:bg-[#1c130d]">
        <div className="text-red-500 dark:text-red-400 text-xl font-medium">
          Order not found
        </div>
      </div>
    );
  }

  const shipping = order.shippingAddress || {};
  const paymentMethod = String(order.paymentMethod || "").replace(/_/g, " ");

  return (
    <div className="min-h-screen bg-[#fffcf6] dark:bg-[#1c130d] py-8 sm:py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#252018] rounded-2xl border border-[#eee6d8] dark:border-[#4a4031] shadow-[0_8px_30px_rgba(43,29,20,0.08)] dark:shadow-black/30 p-6 sm:p-8 lg:p-10 transition-colors duration-300">
          {/* Success header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-[5px] border-primary text-primary mb-5">
              <CheckCircle className="w-14 h-14" strokeWidth={2.2} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#163b27] dark:text-[#f3e7d0] mb-3">
              Order Confirmed!
            </h1>

            <p className="text-[#4d4035] dark:text-gray-300 mb-2">
              Thank you for your order. Your order ID is:
            </p>
            <p className="text-primary font-bold break-all text-sm sm:text-base">
              {order._id}
            </p>
          </div>

          {/* Order details */}
          <div className="mt-8 rounded-xl border border-[#dfe8dc] dark:border-[#5a6045] bg-[#f4faf5] dark:bg-[#302d23] p-5 sm:p-6 text-left transition-colors duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-[#163b27] dark:text-[#f3e7d0] mb-4">
              Order Details
            </h2>

            <div className="divide-y divide-[#dce5d8] dark:divide-[#514b3d]">
              <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
                <div className="flex items-center gap-3 text-[#24382b] dark:text-gray-200">
                  <ShoppingBag className="w-5 h-5 text-[#71963e] dark:text-[#a5c65b]" />
                  <span>Total Amount</span>
                </div>
                <span className="font-bold text-primary">
                  Rs{order.totalPrice}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3 text-[#24382b] dark:text-gray-200">
                  <ClipboardList className="w-5 h-5 text-[#71963e] dark:text-[#a5c65b]" />
                  <span>Status</span>
                </div>
                <span className="font-semibold capitalize text-primary">
                  {order.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
                <div className="flex items-center gap-3 text-[#24382b] dark:text-gray-200">
                  <CreditCard className="w-5 h-5 text-[#71963e] dark:text-[#a5c65b]" />
                  <span>Payment Method</span>
                </div>
                <span className="font-semibold capitalize text-right text-primary">
                  {paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="mt-6 rounded-xl border border-[#eee6d8] dark:border-[#51493a] bg-[#fffdfa] dark:bg-[#2d291f] p-5 sm:p-6 text-left transition-colors duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-[#163b27] dark:text-[#f3e7d0] mb-5">
              Shipping Address
            </h2>

            <div className="space-y-3 text-[#40362e] dark:text-gray-200">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 mt-0.5 shrink-0 text-[#71963e] dark:text-[#a5c65b]" />
                <span>{shipping.fullName}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[#71963e] dark:text-[#a5c65b]" />
                <span>{shipping.address}</span>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 mt-0.5 shrink-0 text-[#71963e] dark:text-[#a5c65b]" />
                <span>
                  {shipping.city}, {shipping.state} {shipping.postalCode}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 mt-0.5 shrink-0 text-[#71963e] dark:text-[#a5c65b]" />
                <span>{shipping.country}</span>
              </div>

              {shipping.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-0.5 shrink-0 text-[#71963e] dark:text-[#a5c65b]" />
                  <span>{shipping.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-center mt-7">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-secondary shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
