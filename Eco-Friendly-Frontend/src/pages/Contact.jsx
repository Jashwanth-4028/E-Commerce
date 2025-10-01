import bgBanner from "../assets/prod.webp";
import { Link } from "react-router-dom";
import ContactMap from "../components/ContactMap";
import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (
        <>
            {/* Banner Section */}
            <div className="relative w-full h-48 md:h-72 lg:h-96">
                <img
                    src={bgBanner}
                    alt="Contact Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <h1 className="text-white text-3xl md:text-4xl font-bold">Contact EcoMart</h1>
                    <ul className="flex items-center text-gray-200 font-medium justify-center gap-5 mt-5">
                        <li><Link to="/home" className="hover:underline">Home</Link></li>
                        <li>|</li>
                        <li><Link to="/products" className="hover:underline">Products</Link></li>
                        <li>|</li>
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                    </ul>
                </div>
            </div>
            <ContactForm />
            <ContactMap />
        </>
    );
};

export default Contact;
