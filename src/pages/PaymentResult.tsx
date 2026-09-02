import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const PaymentResult = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const orderId = params.get("orderId");

  const success = status === "success";
  const pending = status === "pending";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center">
        {success ? (
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-5" />
        ) : pending ? (
          <Clock className="w-16 h-16 mx-auto text-yellow-500 mb-5" />
        ) : (
          <XCircle className="w-16 h-16 mx-auto text-red-500 mb-5" />
        )}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {success
            ? "Payment Successful"
            : pending
              ? "Payment Pending"
              : "Payment Failed"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {success
            ? "Your payment was verified by the server and your order is being processed."
            : pending
              ? "The payment has not been completed yet. Please check your order status."
              : "We could not verify this payment. If money was deducted, please contact support before trying again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {orderId && (
            <Link
              to={`/order-confirmation/${orderId}`}
              className="bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-secondary"
            >
              View Order
            </Link>
          )}
          <Link
            to="/my-orders"
            className="px-5 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
          >
            My Orders
          </Link>
          <Link
            to="/"
            className="px-5 py-3 rounded-xl font-semibold text-primary"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
