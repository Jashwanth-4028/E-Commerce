import vid from "../assets/video.mp4";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Video() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="w-full relative my-10 md:my-20">
            {/* Background Video */}
            <video
                className="w-full h-[400px] md:h-[600px] object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={vid} type="video/mp4" />
            </video>

            {/* Overlay Box */}
            <div
                className="absolute inset-0 flex flex-col justify-center items-start px-5 md:px-10 bg-black/30 backdrop-blur-sm text-white space-y-3"
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-duration="1200"
            >
                <p className="tracking-wide uppercase text-sm font-medium text-green-300">
                    Eco-Friendly Store
                </p>
                <h1 className="text-2xl md:text-5xl font-bold leading-snug">
                    Sustainable Products for Everyday Life
                </h1>
                <p className="text-[16px] md:text-[18px] max-w-md">
                    Explore bamboo, reusable, recycled, and organic items to make your lifestyle greener.
                </p>
                <Link to="/products">
                    <button className="bg-green-800 hover:bg-green-900 mt-3 transition duration-500 ease-in-out cursor-pointer py-3 px-10 text-white font-semibold text-[16px] md:text-[16px] rounded">
                        Shop Now
                    </button>
                </Link>
            </div>
        </div>
    );
}