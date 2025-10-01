import about from "../assets/eco-banner2.jpg";
import recycle from "../assets/about/recycle.jpeg";
import recycledBoxes from "../assets/about/recycled-boxes.jpg";
import sustainablePackaging from "../assets/about/sustainable-packaging.jpeg";
import organic from "../assets/about/organic.jpg";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const features = [
        { img: recycle, name: "Reusable" },
        { img: recycledBoxes, name: "Eco-Friendly Materials" },
        { img: sustainablePackaging, name: "Sustainable Packaging" },
        { img: organic, name: "Organic & Natural" },
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-center mx-10 my-10 md:my-20 gap-10">
            {/* Left Image Section */}
            <div className="w-full md:w-1/2">
                <img src={about} alt="About Us" className="w-full h-auto" />
            </div>

            {/* Right Text Section */}
            <div className="w-full md:w-1/2" data-aos="fade-up">
                <p className="tracking-wide uppercase text-sm text-[#536e1c] font-medium">
                    PURE AND SIMPLE
                </p>
                <h2 className="text-[22px] md:text-[30px] xl:text-4xl text-gray-900 mt-3 mb-5 leading-tight">
                    Sustainable Products for a Greener Lifestyle
                </h2>
                <p className="text-gray-600 text-[16px] mb-5">
                    Our products are carefully designed to reduce environmental impact while promoting a sustainable lifestyle. From reusable items to eco-friendly materials, every choice matters.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <img src={feature.img} alt={feature.name} className="w-[60px]" />
                            <h3 className="text-[16px] xl:text-[20px]">{feature.name}</h3>
                        </div>
                    ))}
                </div>

                <Link to="/contact">
                    <button className="bg-[#2d3a15] hover:bg-black mt-10 transition duration-500 ease-in-out cursor-pointer py-3 px-10 text-white font-semibold text-[16px]">
                        Let's Connect
                    </button>
                </Link>
            </div>
        </div>
    );
}
