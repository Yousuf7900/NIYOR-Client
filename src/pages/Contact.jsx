import { Helmet } from "react-helmet-async";

const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <Helmet>
                <title>NIYOR | নিওর - CONTACT</title>
            </Helmet>
            <div className="text-center mb-16">
                <h1 className="text-4xl tracking-[0.2em] text-neutral-800">
                    CONTACT
                </h1>
                <p className="mt-4 text-[#B08A3C] tracking-[0.3em] text-sm">
                    NIYOR | নিওর
                </p>
                <p className="mt-6 text-neutral-600 max-w-xl mx-auto text-sm">
                    We'd love to hear from you. Whether you have a question about products,
                    orders, or collaborations — our team is here to assist.
                </p>
                <p className="mt-2 text-neutral-500 text-sm">
                    আপনার যেকোনো প্রশ্ন বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">

                <div>
                    <h2 className="text-lg tracking-wide text-neutral-800 mb-6">
                        Send a Message
                    </h2>

                    <form className="space-y-6">

                        <div>
                            <label className="block text-sm text-neutral-600 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-[#B08A3C] transition-colors"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-neutral-600 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-[#B08A3C] transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-600 mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                className="w-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-[#B08A3C] transition-colors"
                                placeholder="Enter your phone"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-neutral-600 mb-2">
                                Message
                            </label>
                            <textarea
                                rows="5"
                                className="w-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-[#B08A3C] transition-colors"
                                placeholder="Write your message"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="px-8 py-3 text-sm tracking-wide border border-[#B08A3C] text-[#B08A3C] hover:bg-[#B08A3C] hover:text-white transition-all duration-300"
                        >
                            Send Message
                        </button>

                    </form>
                </div>


                <div>
                    <h2 className="text-lg tracking-wide text-neutral-800 mb-6">
                        Contact Information
                    </h2>

                    <div className="space-y-6 text-sm text-neutral-600">

                        <div>
                            <p className="text-neutral-800 font-medium">Email</p>
                            <p>niyor.clothing@gmail.com</p>
                        </div>

                        <div>
                            <p className="text-neutral-800 font-medium">Phone</p>
                            <p>+880 1576-733571</p>
                        </div>

                        <div>
                            <p className="text-neutral-800 font-medium">Address</p>
                            <p>Cumilla-3500, Bangladesh</p>
                        </div>

                        <div>
                            <p className="text-neutral-800 font-medium">Business Hours</p>
                            <p>Saturday – Thursday</p>
                            <p>10:00 AM – 10:00 PM</p>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Contact;
