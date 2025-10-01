import banner from '../assets/eco-banner1.jpg'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Banner() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className='relative w-full'>
            <img
                src={banner}
                className='w-full h-[350px] md:h-[500px] object-cover'
                alt="Eco-Friendly Banner"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>

            <div
                className="absolute left-5 md:left-10 p-2 md:p-4 w-[350px] md:w-[600px] rounded-md"
                style={{ top: '12.5%' }}
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-duration="1200"
            >
                <p className='text-white text-[16px] font-semibold mb-[20px] md:text-base'>SUSTAINABLE LIVING</p>
                <h1 className='text-white text-[20px] md:text-[40px] font-medium mb-[15px]'>
                    Eco-Friendly Essentials for Everyday Life
                </h1>
                <p className='text-white text-[16px] mb-[20px]'>
                    Discover bamboo, reusable, recycled, and organic products that help you live greener while protecting the planet.
                </p>
                <Link to="/about">
                    <button className='bg-[#ffffffcc] hover:bg-white transform duration-500 ease-in-out cursor-pointer py-3 px-10 md:px-15 md:py-3 text-black font-semibold text-[16px]'>
                        Learn More
                    </button>
                </Link>
            </div>
        </div>


    );
}
