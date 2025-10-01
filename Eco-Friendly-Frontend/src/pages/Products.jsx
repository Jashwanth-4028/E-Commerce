import { useState, useEffect } from "react";
import axios from "axios";
import bgBanner from "../assets/prod.webp";
import { Link } from "react-router-dom";

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availability, setAvailability] = useState("all");
    const [sortOption, setSortOption] = useState("default");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/products`)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else if (res.data.products) {
                    setProducts(res.data.products); 
                } else {
                    console.error("Unexpected API response:", res.data);
                    setProducts([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setProducts([]);
            });
    }, []);


    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    let filteredProducts = products.filter((product) => {
        const productCategory = product.category?.trim().toLowerCase(); // normalize
        const categoryMatch =
            selectedCategories.length === 0 || selectedCategories.includes(productCategory);
        const availabilityMatch =
            availability === "all" ||
            (availability === "inStock" && !product.soldOut) ||
            (availability === "outStock" && product.soldOut);

        return categoryMatch && availabilityMatch;
    });

    const getPriceValue = (price) => {
        if (typeof price === "number") return price;
        if (typeof price === "string") {
            return parseFloat(price.replace(/[^\d.]/g, ""));
        }
        return 0;
    };

    if (sortOption === "ascendName") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "descendName") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "ascendPrice") {
        filteredProducts.sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
    } else if (sortOption === "descendPrice") {
        filteredProducts.sort((a, b) => getPriceValue(b.price) - getPriceValue(a.price));
    }

    return (
        <>
            {/* Banner */}
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
                <img
                    src={bgBanner}
                    alt="Products Banner"
                    className="w-full h-full object-cover object-center"
                />
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "rgba(0, 0, 0, 0.4)" }}
                >
                    <h1 className="text-white text-2xl md:text-3xl font-bold">Products</h1>
                    <ul className="flex items-center text-white font-medium justify-between gap-5 mt-5">
                        <li><Link to="/home" className="hover:underline hover:text-green-300">Home</Link></li>
                        <li>|</li>
                        <li><Link to="/about" className="hover:underline hover:text-green-300">About</Link></li>
                        <li>|</li>
                        <li><Link to="/contact" className="hover:underline hover:text-green-300">Contact</Link></li>
                    </ul>
                </div>
            </div>

            {/* Intro Section */}
            <div className="px-10 md:px-20 text-center mt-10 md:mt-20">
                <p className="tracking-wide uppercase text-sm text-[#536e1c] font-medium">
                    EcoMart
                </p>
                <h2 className="text-[22px] md:text-[30px] xl:text-4xl text-gray-900 mt-3 mb-5 leading-tight">
                    Sustainable Eco-Friendly Products
                </h2>
                <p className="text-gray-600 text-[16px] mb-5">
                    Discover bamboo, reusable, recycled, and organic essentials designed to make
                    your lifestyle greener while protecting the planet.
                </p>
            </div>

            <div className="flex p-4 md:p-6 my-10 md:my-20">
                {/* Filters */}
                <div className="w-1/3 md:w-1/4 pr-4">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>

                    <div className="mb-10">
                        <h3 className="font-semibold mb-6">Category</h3>
                        {["bamboo", "recycled", "reusable", "organic", "compostable"].map(
                            (category) => (
                                <label key={category} className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="mr-2"
                                    />
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </label>
                            )
                        )}
                    </div>

                    {/* Availability */}
                    <div>
                        <h3 className="font-semibold mb-6">Availability</h3>
                        <label className="flex items-center mb-4">
                            <input
                                type="radio"
                                name="availability"
                                value="all"
                                checked={availability === "all"}
                                onChange={(e) => setAvailability(e.target.value)}
                                className="mr-2"
                            />
                            All
                        </label>
                        <label className="flex items-center mb-4">
                            <input
                                type="radio"
                                name="availability"
                                value="inStock"
                                checked={availability === "inStock"}
                                onChange={(e) => setAvailability(e.target.value)}
                                className="mr-2"
                            />
                            In Stock
                        </label>
                        <label className="flex items-center mb-4">
                            <input
                                type="radio"
                                name="availability"
                                value="outStock"
                                checked={availability === "outStock"}
                                onChange={(e) => setAvailability(e.target.value)}
                                className="mr-2"
                            />
                            Sold Out
                        </label>
                    </div>

                    {/* New Arrivals */}
                    <div className="mt-10">
                        <h3 className="font-semibold mb-5">New Arrivals</h3>
                        <div className="space-y-6">
                            {products
                                .filter((product) => !product.soldOut)
                                .slice(-5)
                                .map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4"
                                    >
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="w-18 md:w-24 lg:w-[80px] h-24 lg:h-auto object-cover"
                                        />
                                        <div className="text-start lg:text-left">
                                            <h4 className="text-sm lg:text-[16px] ">{product.name}</h4>
                                            <p className="text-sm lg:text-[14px] text-gray-900 mt-2">
                                                {product.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Best Sellers */}
                    <div className="mt-10">
                        <h3 className="font-semibold mb-5">Best Sellers</h3>
                        <div className="space-y-6">
                            {products
                                .filter((product) => !product.soldOut)
                                .slice(0, 5)
                                .map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4"
                                    >
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="w-18 md:w-24 lg:w-[80px] h-24 lg:h-auto object-cover"
                                        />
                                        <div className="text-start lg:text-left">
                                            <h4 className="text-sm lg:text-[16px] ">{product.name}</h4>
                                            <p className="text-sm lg:text-[16px] text-gray-900 mt-2">
                                                {product.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="w-3/4 pl-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h2 className="text-[22px] md:text-3xl mb-3 md:mb-0 md:mt-0">Products</h2>
                        <select
                            className="p-2 border rounded"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="default">Sort by</option>
                            <option value="ascendName">Sort by: A-Z</option>
                            <option value="descendName">Sort by: Z-A</option>
                            <option value="ascendPrice">Sort by: Price Low to High</option>
                            <option value="descendPrice">Sort by: Price High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className={`p-3 relative ${product.soldOut
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                    }`}
                            >
                                {product.soldOut ? (
                                    <div>
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="w-full h-auto object-cover"
                                        />
                                        <div className="mt-4">
                                            <h3 className="text-[14px] md:text-[18px]">
                                                {product.name}
                                            </h3>
                                            {product.discount && (
                                                <span className="bg-[#53a080] text-white text-xs px-2 py-1 inline-block mt-1">
                                                    {product.discount} OFF
                                                </span>
                                            )}
                                            <p className="text-gray-600 mt-2 text-sm">
                                                <span className="text-gray-900">{product.price}</span>
                                                {product.regularPrice && (
                                                    <span className="ml-2 line-through text-gray-400 text-xs">
                                                        {product.regularPrice}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={`/product/${product._id}`} className="block">
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="w-full h-60 object-center object-cover"
                                        />
                                        <div className="mt-4">
                                            <h3 className="text-[14px] md:text-[18px]">
                                                {product.name}
                                            </h3>
                                            {product.discount && (
                                                <span className="bg-[#53a080] text-white text-xs px-2 py-1 inline-block mt-1">
                                                    {product.discount} OFF
                                                </span>
                                            )}
                                            <p className="text-gray-600 mt-2 text-sm">
                                                <span className="text-gray-900">{product.price}</span>
                                                {product.regularPrice && (
                                                    <span className="ml-2 line-through text-gray-400 text-xs">
                                                        {product.regularPrice}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
