import icon from "../assets/eco.png"
import userIcon from "../assets/user.png"
import cart from "../assets/cart.png"
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user?email=${currentUser.email}`);
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsProfileOpen(false);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            toast.error("Logout failed. Try again.");
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 z-50 left-0">
            <div className="p-1 bg-[#F5F5F5]">
                <marquee behavior="scroll" direction="left" scrollamount="5" className="text-[#2f3e10] text-[14px] font-semibold">
                    Sustainable Savings! Up to 50% Off Eco-Friendly Products | Free Delivery on Orders over ₹1000
                </marquee>
            </div>

            {/* Navigation */}
            <nav className='flex items-center justify-between p-3 px-4 md:px-5 bg-white shadow-md relative z-50'>
                
                {/* Mobile Menu Button */}
                <div className='flex items-center md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)} className='text-gray-900 text-[18px]'>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={icon} alt="Logo" className="w-[25px] md:w-[30px]" />
                    <h1 className="text-[20px] md:text-[25px] font-semibold">EcoMart</h1>
                </div>

                {/* Menu Links */}
                <div className={`absolute md:static top-12 left-0 w-full md:w-auto bg-[#EEEDD9] md:bg-transparent shadow-md md:shadow-none md:flex items-center justify-center p-5 md:p-0 
                    transition-all duration-300 ease-in-out transform 
                    ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} md:translate-x-0 md:opacity-100 z-40`}>
                    
                    <ul className='flex h-screen md:h-auto flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6'>
                        <li className='md:hidden text-[#536e1c] text-base font-medium hover:text-[#729855]'>
                            {user ? `Welcome, ${user.username}` : "Welcome, Guest"}
                        </li>
                        <li>
                            <Link to='/home' className='text-gray-900 text-base font-medium hover:text-[#729855]' onClick={() => setIsOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to='/products' className='text-gray-900 text-base font-medium hover:text-[#729855]' onClick={() => setIsOpen(false)}>Products</Link>
                        </li>
                        <li>
                            <Link to='/about' className='text-gray-900 text-base font-medium hover:text-[#729855]' onClick={() => setIsOpen(false)}>About</Link>
                        </li>
                        <li>
                            <Link to='/contact' className='text-gray-900 text-base font-medium hover:text-[#729855]' onClick={() => setIsOpen(false)}>Contact</Link>
                        </li>

                        {/* Mobile Profile Dropdown */}
                        <li className="md:hidden hover:text-[#729855]">
                            <div
                                className="flex items-center justify-between cursor-pointer text-gray-900 hover:bg-gray-200"
                                onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                            >
                                My Profile
                                <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileProfileOpen ? "rotate-180" : ""}`} />
                            </div>

                            {isMobileProfileOpen && (
                                <ul className="p-2">
                                    {user?.isadmin ? (
                                        <li className="py-2 hover:text-[#729855]">
                                            <Link to="/add-product" onClick={() => setIsOpen(false)}>Add Product</Link>
                                        </li>
                                    ) : (
                                        <li className="py-2 hover:text-[#729855]">
                                            <Link to="/order-details" onClick={() => setIsOpen(false)}>Order History</Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>

                        {/* Mobile Logout */}
                        <li>
                            <div onClick={handleLogout} className="flex md:hidden items-center hover:bg-black bg-[#2d3a15] transform duration-500 ease-in-out cursor-pointer px-5 py-2 hover:text-white font-semibold text-[16px] group">
                                <button className="bg-transparent text-white group-hover:text-white font-semibold text-[16px] cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Cart & Profile (Desktop) */}
                <div className='flex items-center gap-3'>
                    <Link to='/cart' className='text-gray-900 relative text-[18px] hover:text-[#729855]'>
                        <img src={cart} className="w-7 md:w-8" alt="Cart" />
                    </Link>

                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="hidden md:flex items-center gap-0.5 cursor-pointer"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <img src={userIcon} className="w-5 md:w-8" alt="User" />
                            <ChevronDown size={18} className={`text-gray-600 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
                        </div>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-2 z-50">
                                <p className="px-4 py-2 text-[#536e1c] font-medium">
                                    {user ? `Welcome, ${user.username}` : "Welcome, Guest"}
                                </p>
                                <hr className="border-gray-300 mb-2" />

                                {user?.isadmin ? (
                                    <li className="hidden px-3 py-2 md:flex">
                                        <Link to="/add-product">
                                            <div className="flex items-center gap-2 hover:bg-black bg-[#2d3a15] transform duration-500 ease-in-out cursor-pointer px-5 py-2 hover:text-white font-semibold text-[16px] group">
                                                <button className="bg-transparent text-white group-hover:text-white font-semibold text-[16px] cursor-pointer">
                                                    Add Product
                                                </button>
                                            </div>
                                        </Link>
                                    </li>
                                ) : (
                                    <Link to="/order-details" className="w-full text-left text-base px-4 py-2 hover:text-[#729855] cursor-pointer">
                                        Order History
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div onClick={handleLogout} className="hidden md:flex items-center hover:bg-black bg-[#2d3a15] transform duration-500 ease-in-out cursor-pointer px-5 py-2 hover:text-white font-semibold text-[16px] group">
                        <button className="bg-transparent text-white group-hover:text-white font-semibold text-[16px] cursor-pointer">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
