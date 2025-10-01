import { useState } from "react";
const ContactCard = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
      const [status, setStatus] = useState("");
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
    
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
    
          if (response.ok) {
            setStatus("Message sent successfully ✅");
            setForm({ name: "", email: "", phone: "", message: "" });
            setTimeout(()=>setStatus(""),3000);
          } else {
            setStatus("Failed to send ❌");
            setTimeout(()=>setStatus(""),3000);
          }
        } catch (error) {
          setStatus("Error sending message ❌");
          setTimeout(()=>setStatus(""),3000);
        }
      };
    const contactDetails = [
        {
            id: 1,
            title: "Address",
            info: "EcoMart HQ,MG Road, Bengaluru, Karnataka, India",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.97-4.97 9-9.79 9-14.25A9 9 0 003 6.75C3 11.21 7.03 16.03 12 21z" />
                </svg>
            ),
        },
        {
            id: 2,
            title: "Phone",
            info: "+91 98765 43210",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25V18.2a1.5 1.5 0 00-1.1-1.45l-4.2-1.2a1.5 1.5 0 00-1.6.5l-1 1.3a12.05 12.05 0 01-7-7l1.3-1a1.5 1.5 0 00.5-1.6l-1.2-4.2A1.5 1.5 0 004.5 3H3.75A1.5 1.5 0 002.25 4.5v2.25z" />
                </svg>
            ),
        },
        {
            id: 3,
            title: "Email",
            info: "support@ecomart.com",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.25a2.25 2.25 0 01-1.1 1.9l-7.5 4.6a2.25 2.25 0 01-2.4 0l-7.5-4.6a2.25 2.25 0 01-1.1-1.9v-.25" />
                </svg>
            ),
        },
        {
            id: 4,
            title: "Store Hours",
            info: "Mon - Sat: 10am to 7pm",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-14 mx-auto flex flex-col md:flex-row items-center justify-center">
                {/* Left Side - Contact Details */}
                <div className="lg:w-2/5 md:w-1/2 w-full mb-10 md:mb-0 bg-white p-6">
                    <p className="tracking-wide uppercase text-sm text-[#536e1c] font-medium">
                        Get in Touch
                    </p>
                    <h2 className="text-[22px] md:text-[30px] xl:text-4xl text-gray-900 mt-3 mb-5 leading-tight">
                        Have questions about sustainable living?
                    </h2>
                    <p className="text-gray-600 text-[16px] mb-5">
                        Reach out to us for eco-friendly product queries, bulk orders, or tips on sustainable lifestyle choices.
                    </p>

                    <div className="mt-6 space-y-6">
                        {contactDetails.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#536e1c] text-white">
                                    {item.icon}
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg font-medium text-gray-900">{item.title}</dt>
                                    <dd className="text-gray-500">{item.info}</dd>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-[#536e1c] mb-6">Get in Touch</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Your Phone"
                            className="w-full p-3 border rounded-lg"
                        />
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="4"
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-[#536e1c] text-white px-6 py-3 rounded-lg hover:bg-black transition"
                        >
                            Send Message
                        </button>
                    </form>
                    {status && <p className="mt-4 text-center text-sm">{status}</p>}
                </div>
            </div>
        </section>
    );
};

export default ContactCard;
