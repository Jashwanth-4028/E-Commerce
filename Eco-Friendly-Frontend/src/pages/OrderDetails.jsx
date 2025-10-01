import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import bgBanner from "../assets/prod.webp";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const userEmail = user.email;
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/get-orders?email=${userEmail}`
        );
        if (!res.ok) throw new Error("No order history");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div className="relative w-full h-48 md:h-72 lg:h-96">
        <img
          src={bgBanner}
          alt="EcoMart Banner"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(255, 255, 255, 0.2)" }}
        >
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            My EcoMart Orders
          </h1>
          <ul className="flex items-center text-black font-medium justify-between gap-5 mt-5">
            <li>
              <Link to="/home" className="hover:underline hover:text-red-500">
                Home
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/products" className="hover:underline hover:text-red-500">
                Products
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/about" className="hover:underline hover:text-red-500">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-lg p-10 py-10 md:py-20 container mx-auto">
        {loading && <p className="text-gray-500">Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="text-gray-600">
            No orders found.{" "}
            <Link
              to="/products"
              className="text-[#536e1c] hover:text-[#8aa35c] hover:underline"
            >
              Shop Now
            </Link>
          </p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-3 px-4 font-medium text-lg">Order ID</th>
                  <th className="py-3 px-4 font-medium text-lg">Products</th>
                  <th className="py-3 px-4 font-medium text-lg">Address</th>
                  <th className="py-3 px-4 font-medium text-lg text-center">
                    Amount
                  </th>
                  <th className="py-3 px-4 font-medium text-lg text-center">
                    Status
                  </th>
                  <th className="py-3 px-4 font-medium text-lg text-right">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-300">
                    <td className="py-4 px-4 text-gray-700 w-[200px] truncate">
                      {order.orderId}
                    </td>
                    <td className="py-4 px-4 w-[250px]">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-gray-600">
                          {item.name} ({item.quantity}x)
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-4 text-gray-700 w-[200px] truncate">
                      {order.fullAddress}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700 font-medium w-[200px]">
                      ₹{order.totalAmount}
                    </td>
                    <td className="py-4 px-4 text-center w-[200px]">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {order.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-600 w-[100px] truncate">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
