import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import solar from "../assets/EcoEssentials/solar-cell.png";
import delivery from "../assets/EcoEssentials/delivery.png";
import bamboo from "../assets/EcoEssentials/bamboo.png";
import recycling from "../assets/EcoEssentials/recycling.png";

export default function EcoEssentials() {
    
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const features = [
        { img: solar, name: "Solar-Powered", des: "Harness clean energy with solar-powered products that reduce carbon footprint." },
        { img: delivery, name: "Eco Delivery", des: "Sustainable packaging and low-emission delivery methods for every order." },
        { img: bamboo, name: "Bamboo Products", des: "Durable, reusable bamboo items to replace single-use plastics." },
        { img: recycling, name: "Recycled Materials", des: "Products made from recycled materials for a greener lifestyle." },
    ];

    return (
        <div className="grid grid-cols-1 xl:mt-15 sm:grid-cols-2  my-10 md:my-20 mx-3 lg:grid-cols-4 gap-6 p-6">
            {features.map((item, index) => (
                <div 
                    key={index} 
                    className="p-6 bg-white shadow-lg flex flex-col items-center text-center"
                    data-aos="fade-up" 
                    data-aos-delay={index * 200} 
                >
                    <img src={item.img} alt={item.name} className="w-16 h-16 mb-4" />
                    <h3 className="text-[20px] mb-2">{item.name}</h3>
                    <p className="text-gray-600">{item.des}</p>
                </div>
            ))}
        </div>
    );
}
