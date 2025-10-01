import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Review() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const fetchReviews = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="my-10 md:my-20 mx-10">
            <div className="text-center">
                <p className="text-[#536e1c] text-sm uppercase font-medium">Eco-Lifestyle Reviews</p>
                <h2 className="text-[22px] md:text-3xl text-gray-900 mt-3 mb-5">What Our Customers Say</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Hear from our customers who embraced sustainable living with our eco-friendly products.
                </p>
            </div>

            <div className="grid gap-6 mt-10 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 shadow-lg text-center"
                        data-aos="fade-up"
                        data-aos-delay={index * 200}
                    >
                        <img
                            src={review.img}
                            alt={review.name}
                            className="w-50 h-50 mx-auto rounded-full mb-4"
                        />
                        <h3 className="text-[20px]">{review.name}</h3>
                        <p className="text-sm text-[#536e1c]">{review.location}</p>
                        <p className="text-gray-600 mt-4">{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
