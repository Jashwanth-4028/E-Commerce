import { useState } from "react";

export default function AddProducts() {
    const [formData, setFormData] = useState({
        img: "",
        name: "",
        category: "",
        price: "",
        regularPrice: "",
        discount: "",
        soldOut: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            alert(data.message);
            setFormData({
                img: "",
                name: "",
                category: "",
                price: "",
                regularPrice: "",
                discount: "",
                soldOut: false
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="flex justify-center items-center py-10 bg-gray-100 px-4">
            <div className="bg-white p-8 shadow-md w-full max-w-md">
                <h2 className="text-2xl text-gray-900 text-start mb-2">Add New Eco-Friendly Product</h2>
                <p className="text-base text-gray-600 mb-6">Enter sustainable product details</p>

                <form onSubmit={addProduct}>
                    {/* Product Image URL */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Product Image URL</label>
                        <input
                            type="text"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                            required
                        />
                        {formData.img && (
                            <div className="w-full h-48 mt-4 border">
                                <img
                                    src={formData.img}
                                    alt="Preview"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        )}
                    </div>


                    {/* Product Name */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                            required />
                    </div>

                    {/* Category Dropdown */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="bamboo">Bamboo</option>
                            <option value="recycled">Recycled</option>
                            <option value="reusable">Reusable</option>
                            <option value="organic">Organic</option>
                            <option value="compostable">Compostable</option>
                        </select>
                    </div>


                    {/* Price */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Price</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange}
                            placeholder="₹250"
                            className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                            required />
                    </div>

                    {/* Regular Price */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Regular Price</label>
                        <input type="text" name="regularPrice" value={formData.regularPrice} onChange={handleChange}
                            placeholder="₹300"
                            className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                            required />
                    </div>

                    {/* Discount */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Discount (%)</label>
                        <input type="text" name="discount" value={formData.discount} onChange={handleChange}
                            className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                            required />
                    </div>

                    {/* Sold Out */}
                    <div className="mb-4 flex items-center">
                        <label className="text-sm text-gray-600 mr-2">Sold Out?</label>
                        <input type="checkbox" name="soldOut" checked={formData.soldOut} onChange={handleChange} />
                    </div>

                    <button type="submit"
                        className="w-full text-white bg-[#536e1c] py-3 cursor-pointer px-6 text-base hover:bg-[#697c45]">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
