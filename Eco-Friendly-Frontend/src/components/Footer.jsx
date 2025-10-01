import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import icon from "../assets/eco.png";

export default function Footer() {
    return (
        <footer className="bg-[#182008] text-white pt-15 py-5">
            <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Column 1 - Brand Info */}
                <div>
                    <div className="flex items-center gap-2">
                        <img src={icon} alt="Logo" className="w-[30px]" />
                        <h1 className="text-[22px] md:text-[25px] font-semibold">EcoMart</h1>
                    </div>
                    <p className="text-white text-sm mt-2">
                        Your one-stop store for eco-friendly and sustainable products. Shop responsibly, live sustainably.
                    </p>
                    <div className="flex space-x-4 mt-5">
                        <Link to="#" className="text-white hover:text-[#729855] transition">
                            <FaFacebookF size={20} />
                        </Link>
                        <Link to="#" className="text-white hover:text-[#729855] transition">
                            <FaTwitter size={20} />
                        </Link>
                        <Link to="#" className="text-white hover:text-[#729855] transition">
                            <FaInstagram size={20} />
                        </Link>
                        <Link to="#" className="text-white hover:text-[#729855] transition">
                            <FaLinkedinIn size={20} />
                        </Link>
                        <Link to="#" className="text-white hover:text-[#729855] transition">
                            <FaWhatsapp size={20} />
                        </Link>
                    </div>
                </div>

                {/* Column 2 - Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/home" className="text-white hover:text-[#729855] transition">Home</Link></li>
                        <li><Link to="/products" className="text-white hover:text-[#729855] transition">Products</Link></li>
                        <li><Link to="/about" className="text-white hover:text-[#729855] transition">About Us</Link></li>
                        <li><Link to="/contact" className="text-white hover:text-[#729855] transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Column 3 - Customer Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
                    <ul className="space-y-2">
                        <li><Link to="#" className="text-white hover:text-[#729855] transition">Shipping Info</Link></li>
                        <li><Link to="#" className="text-white hover:text-[#729855] transition">Returns & Refunds</Link></li>
                        <li><Link to="#" className="text-white hover:text-[#729855] transition">Privacy Policy</Link></li>
                        <li><Link to="#" className="text-white hover:text-[#729855] transition">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Column 4 - Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                            <FaEnvelope size={18} className="text-[#729855]" />
                            <span>support@ecomart.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt size={18} className="text-[#729855]" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt size={18} className="text-[#729855]" />
                            <span>Bengaluru, Karnataka, India</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="mt-8 text-center text-[#FFFFFF] text-sm border-t border-[#729855] pt-4">
                &copy; {new Date().getFullYear()} EcoMart. All Rights Reserved.
            </div>
        </footer>
    );
}
