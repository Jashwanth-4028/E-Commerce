const partners = [
  "/images/partners/ecert.webp",
  "/images/partners/patagonia.jpg",
  "/images/partners/seventh-generation.webp",
  "/images/partners/dr.bronner.jpg",
  "/images/partners/lush.jpg",
  "/images/partners/usda.jpg",
];
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
                            className="w-[200px] h-auto object-contain" loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
