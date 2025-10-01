import bgBanner from "../assets/ban.jpg";
import AboutBanner from "../components/AboutBanner";
import EcoEssentials from "../components/EcoEssentials";
import Partners from "../components/Partners";
import Review from "../components/Review";
import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <>
            {/* Banner Section */}
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
                <img
                    src={bgBanner}
                    alt="About Us Banner"
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "rgba(0, 0 , 0, 0.4)" }}
                >
                    <h1 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                        About Us
                    </h1>
                    <ul className="flex items-center text-white font-medium justify-center gap-2 mt-3">
                        <li>
                            <Link to="/home" className="hover:underline hover:text-green-300">
                                Home
                            </Link>
                        </li>
                        <li>|</li>
                        <li>About Us</li>
                    </ul>
                </div>
            </div>

            <EcoEssentials />
            <Partners />
            <AboutBanner />
            <Review />
        </>
    );
}
