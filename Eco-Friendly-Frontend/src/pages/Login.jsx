import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);

            setFormData({ email: "", password: "" });
            toast.success("User Logged in");
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } catch (error) {
            toast.error("Invalid Credentials");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white p-8 shadow-md w-full max-w-md">
                    <h2 className="text-2xl text-gray-900 text-start mb-2">Welcome Back to EcoMart</h2>
                    <p className="text-base text-gray-600 mb-6">Log in to explore sustainable and eco-friendly products</p>
                    <form onSubmit={handleLogin}>
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
                        <button type="submit"
                            className="w-full text-white bg-[#536e1c] py-3 cursor-pointer px-6 text-base hover:bg-[#697c45]">
                            Login
                        </button>
                    </form>
                    <p className='text-[#737373] font-medium text-[16px] mt-5 text-center'>
                        Don't have an account? <a href="/signup"><span className='text-[#536e1c] font-medium underline text-[16px] cursor-pointer'>Sign Up</span></a>
                    </p>
                </div>
            </div>
        </>
    );
}