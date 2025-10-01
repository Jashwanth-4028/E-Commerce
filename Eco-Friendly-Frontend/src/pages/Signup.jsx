import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            console.log("Signing up user:", formData);
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("API URL:", import.meta.env.VITE_API_URL);

    
            // Save user in MongoDB
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
    
            console.log("MongoDB Response:", response.data);
    
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
    
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(error.message || "Error, Please try again");
        }
    };
    
    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white p-8 shadow-md w-full max-w-md">
                    <h2 className="text-2xl text-gray-900 text-start mb-2">Join EcoMart</h2>
                    <p className="text-base text-gray-600 mb-6">
                        Create your account and start shopping eco-friendly, sustainable products
                    </p>
                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <button type="submit"
                            className="w-full text-white bg-[#536e1c] py-3 px-6 cursor-pointer text-base hover:bg-[#697c45]">
                            Sign Up
                        </button>
                    </form>
                    <p className='text-[#737373] font-medium text-[16px] mt-5 text-center'>
                        Already have an account? <a href="/"><span className='text-[#536e1c] font-medium underline text-[16px] cursor-pointer'>Login</span></a>
                    </p>
                </div>
            </div>
        </>
    );
}