import ecert from "../assets/partners/ecert.webp";
import patagonia from "../assets/partners/patagonia.jpg";
import seventhGen from "../assets/partners/seventh-generation.webp";
import drBronner from "../assets/partners/dr.bronner.jpg";
import lush from "../assets/partners/lush.jpg";
import usda from "../assets/partners/usda.jpg";

const partners = [ecert, patagonia, seventhGen, drBronner, lush, usda];

export default function Partners() {
    return (
        <div className="py-10 mb-5 md:py-20">
            <div className="px-10 md:px-20 text-center">
                <p className="tracking-wide uppercase text-sm text-[#536e1c] font-medium">
                    EcoMart
                </p>
                <h2 className="text-[22px] md:text-[30px] xl:text-4xl text-gray-900 mt-3 mb-8 leading-tight">
                    Our Partners
                </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {partners.map((logo, index) => (
                    <div
                        key={index}
                        className="w-[200px] flex items-center justify-center rounded-lg transition-opacity duration-300 opacity-50 hover:opacity-100"
                    >
                        <img
                            src={logo}
                            alt={`Partner ${index + 1}`}
                            className="w-[200px] h-auto object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
