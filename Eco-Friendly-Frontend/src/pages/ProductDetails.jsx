import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import bgBanner from "../assets/prod.webp";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        if (!savedCart || savedCart === "undefined") return [];
        try {
            return JSON.parse(savedCart);
        } catch {
            return [];
        }
    });



    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error("Error fetching product details:", error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = (productId) => {
        if (!product || !product._id) return toast.error("Failed to add product.");

        const savedCart = localStorage.getItem("cart");
        let currentCart = [];
        if (savedCart && savedCart !== "undefined") {
            try {
                currentCart = JSON.parse(savedCart);
            } catch {
                currentCart = [];
            }
        }

        const existingProduct = currentCart.find((item) => item._id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            currentCart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(currentCart));
        setCart(currentCart);
        setQuantity(1);

        toast.success(`${product.name} added to cart!`, { position: "top-right", autoClose: 1000 });
    };



    return (
        <>
            <ToastContainer />
            {/* Banner */}
            <div className="relative w-full h-48 md:h-72 lg:h-96">
                <img src={bgBanner} alt="Product Banner" className="w-full h-full object-cover" />
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                    <h1 className="text-white text-2xl md:text-3xl font-bold">{product.name}</h1>
                    <ul className="flex items-center text-white font-medium justify-between gap-5 mt-5">
                        <li>
                            <Link to="/home" className="hover:underline hover:text-red-500">
                                Home
                            </Link>
                        </li>
                        <li>|</li>
                        <li>
                            <Link to="/about" className="hover:underline hover:text-red-500">
                                About
                            </Link>
                        </li>
                        <li>|</li>
                        <li>
                            <Link to="/contact" className="hover:underline hover:text-red-500">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Product Section */}
            <div className="container my-10 md:my-20 mx-auto p-6 flex flex-col md:flex-row items-center md:items-start gap-10">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                    <img src={product.img} alt={product.name} className="w-full h-auto" />
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2">
                    <p className="text-[#536e1c] text-sm uppercase font-medium mb-3">EcoMart</p>
                    <h2 className="text-3xl md:text-4xl text-gray-900 mb-3">{product.name}</h2>
                    <p className="text-2xl text-[#536e1c] mb-3">
                        {product.price}{" "}
                        <span className="ml-2 line-through text-gray-400 text-lg">
                            {product.regularPrice}
                        </span>
                    </p>
                    {product.discount && (
                        <p className="bg-[#53a080] text-white text-xs px-2 py-1 inline-block mt-1">
                            {product.discount} OFF
                        </p>
                    )}

                    <hr className="border-t border-gray-300 my-6" />

                    <p className="mb-5 text-gray-600">
                        Make the switch to sustainable living with high-quality, eco-friendly
                        essentials designed for everyday use.
                    </p>
                    <p className="text-lg text-gray-900">
                        Product Category :{" "}
                        <span className="text-black py-2 px-5 bg-[#F5F5F5]">{product.category}</span>
                    </p>

                    {/* Quantity & Cart */}
                    <div className="flex items-center gap-5 md:gap-10 my-8">
                        <div className="flex items-center gap-0.5">
                            <button
                                onClick={decreaseQuantity}
                                className="px-4 py-2 border hover:bg-black hover:text-white transition"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 border">{quantity}</span>
                            <button
                                onClick={increaseQuantity}
                                className="px-4 py-2 border hover:bg-black hover:text-white transition"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => handleAddToCart(product._id)}
                            className="bg-[#2d3a15] hover:bg-black transition py-3 px-10 text-white font-semibold text-[16px]"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <p className="text-base mt-5 text-gray-900">
                        Shipping & Return:{" "}
                        <span className="text-gray-600">
                            Free plastic-free packaging. Worldwide shipping on orders above ₹2000.
                            Delivery in 3–7 working days.
                        </span>
                    </p>

                    <hr className="border-t border-gray-300 my-6" />

                    {/* Description */}
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">Description</h2>
                    <p className="mb-6 text-gray-600">
                        Our eco-friendly products are thoughtfully crafted to reduce waste and
                        promote a greener lifestyle. Whether it’s reusable, biodegradable, or made
                        from recycled materials, each product is designed to make a positive impact
                        on the planet.
                    </p>

                    {/* Additional Details */}
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">Additional Details</h2>
                    <ol className="text-gray-600 mb-6 list-disc pl-6">
                        <li>Made from sustainable and natural materials.</li>
                        <li>Durable, reusable, and designed for long-term use.</li>
                        <li>Free from harmful chemicals and plastics.</li>
                        <li>Packed in 100% recyclable, eco-conscious packaging.</li>
                    </ol>

                    {/* Certificate */}
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">Product Certifications</h2>
                    <p className="text-gray-600 mb-3">
                        Certified eco-friendly, cruelty-free, and compliant with international
                        sustainability standards. Every EcoMart product ensures quality and
                        responsibility toward the environment.
                    </p>
                </div>
            </div>
        </>
    );
}
