import { Link } from "react-router";
import { FiMail, FiArrowRight } from "react-icons/fi";

const ForgotPassword = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-16">
            <div className="w-full max-w-3xl grid lg:grid-cols-2 border border-neutral-200 rounded-md overflow-hidden">

                {/* Left Brand Panel */}
                <div className="hidden lg:flex flex-col justify-center p-14 bg-neutral-50 border-r border-neutral-200">
                    <p className="text-[#B08A3C] tracking-[0.35em] text-sm">
                        NIYOR | নিওর
                    </p>

                    <h1 className="mt-6 text-3xl tracking-[0.18em] text-neutral-800 font-light">
                        Reset Your Password
                    </h1>

                    <p className="mt-5 text-neutral-600 text-sm leading-relaxed max-w-md">
                        Enter your registered email address and we’ll send you instructions
                        to reset your password.
                    </p>

                    <p className="mt-3 text-neutral-500 text-sm leading-relaxed max-w-md">
                        আপনার নিবন্ধিত ইমেইল ঠিকানা দিন — আমরা পাসওয়ার্ড রিসেট করার নির্দেশনা পাঠাবো।
                    </p>

                    <div className="mt-10 w-20 h-px bg-neutral-300"></div>

                    <p className="mt-8 text-neutral-600 text-sm italic">
                        “Security meets simplicity.”
                    </p>
                </div>

                {/* Right Form Panel */}
                <div className="p-8 sm:p-12 bg-white">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl tracking-[0.2em] text-neutral-800">
                            FORGOT PASSWORD
                        </h2>
                        <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-sm">
                            NIYOR | নিওর
                        </p>
                    </div>

                    <form className="mt-10 space-y-6">

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm text-neutral-600 mb-2">
                                Email Address
                            </label>

                            <div className="flex items-center gap-2 border border-neutral-200 rounded-md px-3 py-3 focus-within:border-[#B08A3C] transition-colors">
                                <FiMail className="text-neutral-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-[#B08A3C] text-[#B08A3C] hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md text-sm tracking-wide"
                        >
                            Send Reset Link <FiArrowRight />
                        </button>

                        {/* Back to login */}
                        <p className="text-center text-sm text-neutral-600 mt-6">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="text-[#B08A3C] hover:opacity-80 transition"
                            >
                                Back to Login
                            </Link>
                        </p>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;
