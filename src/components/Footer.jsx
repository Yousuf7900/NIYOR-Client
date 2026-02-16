import { Link } from "react-router";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 py-16">

                <div className="grid md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-xl tracking-[0.18em] text-[#B08A3C] font-semibold">
                            NIYOR | নিওর
                        </h2>
                        <p className="mt-4 text-neutral-600 text-sm leading-relaxed">
                            Timeless Panjabi inspired by heritage and crafted with modern
                            minimal elegance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-neutral-800 tracking-wide mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-neutral-600">
                            <li>
                                <Link to="/" className="hover:text-[#B08A3C] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className="hover:text-[#B08A3C] transition-colors">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-[#B08A3C] transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-[#B08A3C] transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="text-neutral-800 tracking-wide mb-4">Policies</h3>
                        <ul className="space-y-3 text-sm text-neutral-600">
                            <li>
                                <Link to="/privacy-policy" className="hover:text-[#B08A3C] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/return-policy" className="hover:text-[#B08A3C] transition-colors">
                                    Return & Exchange
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-[#B08A3C] transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-neutral-800 tracking-wide mb-4">Connect</h3>
                        <div className="flex gap-4 text-neutral-600">
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
                            >
                                <FiFacebook size={16} />
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
                            >
                                <FiInstagram size={16} />
                            </a>

                            <a
                                href="mailto:niyor.clothing@gmail.com"
                                className="w-9 h-9 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
                            >
                                <FiMail size={16} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-neutral-200 text-center text-sm text-neutral-500">
                    © {new Date().getFullYear()} NIYOR | নিওর. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
