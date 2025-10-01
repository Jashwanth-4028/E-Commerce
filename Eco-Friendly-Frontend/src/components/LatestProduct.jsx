import p1 from "../assets/pr/cloth-bag.jpg";
import p2 from "../assets/pr/lantern.webp";
import p3 from "../assets/pr/soap-bar.jpg";
import p4 from "../assets/pr/phone-stand.webp";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LatestProduct() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const products = [
    { img: p1, name: "Cloth Shopping Bag", price: "₹250" },
    { img: p2, name: "Solar-Powered Lantern", price: "₹800" },
    { img: p3, name: "Organic Soap Bar", price: "₹200" },
    { img: p4, name: "Wooden Phone Stand", price: "₹350" },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 my-10 md:my-20 mx-6 gap-4">
      {/* Left Section */}
      <div
        className="flex flex-col justify-center pr-4" // small padding right
        data-aos="fade-right"
        data-aos-delay="300"
        data-aos-duration="1200"
      >
        <p className="uppercase text-sm text-[#536e1c] font-medium py-3">
          Popular Products Of The Week
        </p>
        <h2 className="text-3xl text-gray-900 mt-4 mb-6">
          Latest Eco-Friendly Collections
        </h2>
        <p className="text-gray-600 text-[16px] mb-10">
          Explore sustainable and reusable products for a greener lifestyle.
        </p>
        <Link to="/products">
          <button className="bg-[#2d3a15] hover:bg-black transition duration-500 ease-in-out cursor-pointer py-3 px-10 text-white font-semibold text-[16px]">
            View All Products
          </button>
        </Link>
      </div>

      {/* Right Section: Scrollable products */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 py-3">
          {products.map((product, index) => (
            <div
              key={index}
              className="min-w-[200px] md:min-w-[230px] p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              {/* Fixed image height/width */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-[18px] font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  <span className="font-bold text-gray-900">
                    {product.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}