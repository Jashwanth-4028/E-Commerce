import banner from '../assets/banner-3.jpeg';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AboutBanner() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div className='relative w-full h-[350px] md:h-[550px] mb-16'>
            <img src={banner} className='w-full h-full object-cover' alt="Website Banner" />
            <div className='absolute inset-0 bg-black/40'></div>

            <div
                className="absolute inset-0 flex flex-col justify-center px-5 md:px-12 w-[350px] md:w-[600px]"
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-duration="1200"
            >
                <p className='text-sm font-semibold text-[#d1f7c4] mb-3 md:text-base tracking-wide uppercase'>SUSTAINABLE LIVING</p>
                <h1 className='text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg'>
                    Eco-Friendly Products for Everyday Life
                </h1>
                <p className='text-gray-200 text-sm md:text-lg mb-6'>
                    Shop bamboo, reusable, recycled, and organic products to make your lifestyle greener.
                </p>
                <Link to="/products">
                    <button className='bg-[#536e1c] hover:bg-[#435816] px-6 md:px-8 py-3 rounded-full text-white font-semibold text-sm md:text-base shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
                        Explore More
                    </button>
                </Link>
            </div>
        </div>
    );
}
