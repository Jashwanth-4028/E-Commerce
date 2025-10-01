import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgBanner from "../assets/prod.webp";
import icon from "../assets/eco.png";
import { getAuth } from "firebase/auth";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const updateCartFromStorage = () => {
            const savedCartStr = localStorage.getItem("cart");

            // If nothing is stored or it's "undefined", set empty array
            if (!savedCartStr || savedCartStr === "undefined") {
                setCart([]);
                return;
            }

            try {
                const savedCart = JSON.parse(savedCartStr);
                setCart(savedCart);
            } catch (err) {
                console.error("Failed to parse cart from localStorage:", err);
                setCart([]);
            }
        };

        updateCartFromStorage();
        window.addEventListener("storage", updateCartFromStorage);
        return () => window.removeEventListener("storage", updateCartFromStorage);
    }, []);



    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        updateCart(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        updateCart(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        updateCart(updatedCart);
    };

    const subtotalAmount = cart.reduce((acc, item) => {
        if (!item.price) return acc;
        const price = item.price.toString().replace(/Rs\.|₹|,/g, "").trim();
        return acc + parseFloat(price) * (item.quantity || 1);
    }, 0);
    const formattedSubtotal = subtotalAmount.toLocaleString("en-IN");

    const auth = getAuth();

    const handleCheckout = async () => {
        if (!address.trim()) return alert("Enter address");

        const user = auth.currentUser;
        if (!user) return alert("User not logged in");

        try {
            // Step 1: Create Razorpay order via backend
            const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: subtotalAmount })
            });

            if (!orderRes.ok) throw new Error("Failed to create order");
            const order = await orderRes.json();

            // Step 2: Razorpay payment options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ Correct key
                amount: order.amount,
                currency: "INR",
                name: "EcoMart",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        // Step 3: Verify payment via backend
                        const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            alert("Payment Successful!");

                            // Store order in DB
                            await fetch(`${import.meta.env.VITE_API_URL}/store-order`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    orderId: order.id,
                                    products: cart,
                                    totalAmount: subtotalAmount,
                                    customer: {
                                        name: user.displayName,
                                        email: user.email,
                                        fullAddress: address
                                    },
                                    paymentId: response.razorpay_payment_id
                                })
                            });

                            localStorage.removeItem("cart");
                            setCart([]);
                            setAddress("");
                        } else {
                            alert("Payment verification failed!");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Error during payment verification");
                    }
                },
                prefill: {
                    name: user.displayName || "",
                    email: user.email || "",
                    contact: user.phoneNumber || "9876543210"
                },
                theme: { color: "#536e1c" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Checkout failed");
        }
    };
    return (
        <>
            <div className="relative w-full h-48 md:h-72 lg:h-96">
                <img src={bgBanner} alt="Product Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-white text-2xl md:text-3xl font-bold">Your Shopping Cart</h1>
                    <ul className="flex items-center text-white font-medium justify-between gap-5 mt-5">
                        <li><Link to="/home" className="hover:underline hover:text-red-500">Home</Link></li>
                        <li>|</li>
                        <li><Link to="/about" className="hover:underline hover:text-red-500">About</Link></li>
                        <li>|</li>
                        <li><Link to="/contact" className="hover:underline hover:text-red-500">Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto my-10 md:my-20 p-6 cart-container">
                {cart.length === 0 ? (
                    <p className="text-center text-lg">
                        Your cart is empty:( <Link to="/products" className="text-[#536e1c] hover:text-[#8aa35c] hover:underline">Continue Shopping</Link>
                    </p>
                ) : (
                    <div className="bg-white shadow-lg p-5 md:p-10">
                        {/* Desktop Cart Table */}
                        <div className="hidden md:block cart-table">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-300">
                                        <th className="py-3 font-medium text-xl">Products</th>
                                        <th className="py-3 font-medium text-xl">Details</th>
                                        <th className="py-3 font-medium text-xl text-center">Price</th>
                                        <th className="py-3 font-medium text-xl text-center">Quantity</th>
                                        <th className="py-3 font-medium text-xl text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="py-4 w-24">
                                                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover" />
                                            </td>
                                            <td className="py-4 w-1/4">
                                                <p className="text-[#536e1c] text-[12px] uppercase font-medium mb-1">EcoMart</p>
                                                <h2 className="text-lg mb-1">{item.name}</h2>
                                                <p className="text-gray-600"><span className="text-gray-900">Category: </span>{item.category}</p>
                                            </td>
                                            <td className="py-4 w-1/6 text-center text-gray-600 font-medium">{item.price}</td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button onClick={() => decreaseQuantity(index)} className="w-10 h-10 border hover:bg-black hover:text-white flex items-center justify-center">-</button>
                                                    <span className="w-12 h-10 flex items-center justify-center border">{item.quantity}</span>
                                                    <button onClick={() => increaseQuantity(index)} className="w-10 h-10 border hover:bg-black hover:text-white flex items-center justify-center">+</button>
                                                </div>
                                            </td>
                                            <td className="py-4 w-1/5 text-right">
                                                <button onClick={() => removeItem(index)} className="text-black hover:text-red-700 text-lg p-2">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cart */}
                        <div className="md:hidden cart-items-mobile">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item border-b border-gray-300 mb-10">
                                    <div className="flex gap-3">
                                        <img src={item.img} alt={item.name} className="w-30" />
                                        <div>
                                            <p className="text-[#536e1c] text-[12px] uppercase font-medium mb-1">EcoMart</p>
                                            <h2 className="text-lg mb-1">{item.name}</h2>
                                            <p className="text-gray-600 mb-2"><span className="text-gray-900">Category: </span>{item.category}</p>
                                            <p className="text-gray-600 font-medium">₹{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="cart-actions flex gap-5 mb-5 mt-6">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => decreaseQuantity(index)} className="w-10 h-10 border hover:bg-black hover:text-white flex items-center justify-center">-</button>
                                            <span className="w-12 h-10 flex items-center justify-center border">{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(index)} className="w-10 h-10 border hover:bg-black hover:text-white flex items-center justify-center">+</button>
                                        </div>
                                        <button onClick={() => removeItem(index)} className="text-black hover:text-red-700 text-lg p-2">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Section */}
                        <div className="mt-10 flex flex-col items-end text-right">
                            <p className="text-xl font-medium mb-4 w-[270px] md:w-[300px]">Subtotal: ₹{formattedSubtotal}</p>
                            <p className="mb-4 w-[270px] md:w-[300px] text-gray-600">Taxes and shipping calculated at checkout</p>
                            <div className="mb-4 w-[270px] md:w-[300px]">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your full address"
                                    className="p-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#536e1c]"
                                />
                            </div>
                            <button onClick={handleCheckout} className="bg-[#2d3a15] mb-4 w-[270px] md:w-[300px] hover:bg-black py-3 px-10 text-white font-semibold">
                                Proceed to Checkout
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </>
    );
}
