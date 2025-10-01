const ContactMap = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px]">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089943376!2d77.46612593299314!3d12.953945614011557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1758533641687!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Store Location"
            ></iframe>

            {/* Optional overlay (green tint). Remove this div if you want a clean map */}
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ backgroundColor: "rgba(83, 110, 28, 0.2)" }}
            ></div>
        </div>
    );
};

export default ContactMap;
