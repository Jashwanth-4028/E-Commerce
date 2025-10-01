import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import bamboo from "../assets/GreenGallery/bamboo-toothbrush.jpg";
import straw from "../assets/GreenGallery/metal-straws.jpg";
import notebook from "../assets/GreenGallery/Recycled-notebook.jpg";
import bottle from "../assets/GreenGallery/stainless-bottle.jpg";

export default function GreenGallery() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Top row images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <img
          src={bamboo}
          alt="Bamboo Toothbrush"
          className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
          data-aos="fade-up"
        />
        <img
          src={straw}
          alt="Reusable Metal Straws"
          className="w-full h-64 md:h-80 object-contain rounded-lg shadow-md"
          data-aos="fade-up"
        />
      </div>

      {/* Center text */}
      <div
        className="text-center my-8 px-4"
        data-aos="fade-up"
      >
        <h3 className="text-sm text-[#2F4F4F] uppercase font-medium">
          Sustainable & Practical
        </h3>
        <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
          Eco-Friendly Product Highlights
        </p>
      </div>

      {/* Bottom row images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <img
          src={notebook}
          alt="Recycled Notebook"
          className="w-full h-64 md:h-80 object-contain rounded-lg shadow-md"
          data-aos="fade-up"
        />
        <img
          src={bottle}
          alt="Stainless Steel Bottle"
          className="w-full h-64 md:h-80 object-contain rounded-lg shadow-md"
          data-aos="fade-up"
        />
      </div>
    </div>
  );
}