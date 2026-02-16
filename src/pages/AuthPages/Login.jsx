import { Link, useNavigate } from "react-router";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "../../components/Loading";

const Login = () => {
    const { signIn } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(false);
    const onSubmit = async (data) => {
        try {
            setPageLoading(true);
            const res = await signIn(data.email, data.password);
            console.log(res.user);
            navigate('/');
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setPageLoading(false);
        }
    };
    if (pageLoading) {
        return <Loading text={"Signing you in..."} />
    }
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-16">
            <div className="w-full max-w-4xl grid lg:grid-cols-2 border border-neutral-200 rounded-md overflow-hidden">

                {/* Left Brand Panel */}
                <div className="hidden lg:flex flex-col justify-center p-14 bg-neutral-50 border-r border-neutral-200">
                    <p className="text-[#B08A3C] tracking-[0.35em] text-sm">
                        NIYOR | নিওর
                    </p>

                    <h1 className="mt-6 text-3xl tracking-[0.18em] text-neutral-800 font-light leading-snug">
                        Welcome Back
                    </h1>

                    <p className="mt-5 text-neutral-600 text-sm leading-relaxed max-w-md">
                        Sign in to explore your cart, track orders, and access exclusive drops.
                    </p>

                    <p className="mt-3 text-neutral-500 text-sm leading-relaxed max-w-md">
                        আপনার কার্ট, অর্ডার এবং নতুন কালেকশন দেখতে লগইন করুন।
                    </p>

                    <div className="mt-10 w-20 h-px bg-neutral-300"></div>

                    <p className="mt-8 text-neutral-600 text-sm italic">
                        “Clothing should whisper identity.”
                    </p>
                </div>

                {/* Right Form Panel */}
                <div className="p-8 sm:p-12 bg-white">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl tracking-[0.2em] text-neutral-800">
                            LOGIN
                        </h2>
                        <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-sm">
                            NIYOR | নিওর
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm text-neutral-600 mb-2">
                                Email Address
                            </label>
                            <div className="flex items-center gap-2 border border-neutral-200 rounded-md px-3 py-3 focus-within:border-[#B08A3C] transition-colors">
                                <FiMail className="text-neutral-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400"
                                    {...register('email', { required: true })}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-neutral-600 mb-2">
                                Password
                            </label>
                            <div className="flex items-center gap-2 border border-neutral-200 rounded-md px-3 py-3 focus-within:border-[#B08A3C] transition-colors">
                                <FiLock className="text-neutral-500" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400"
                                    {...register('password', { required: true })}
                                />
                            </div>
                        </div>

                        {/* Row */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-neutral-600">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm [--chkbg:#B08A3C] [--chkfg:white] border-neutral-300"
                                />
                                Remember me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-sm text-neutral-600 hover:text-[#B08A3C] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-[#B08A3C] text-[#B08A3C] hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md text-sm tracking-wide"
                        >
                            Sign In <FiArrowRight />
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-neutral-200"></div>
                            <p className="text-xs text-neutral-500 tracking-[0.2em]">OR</p>
                            <div className="h-px flex-1 bg-neutral-200"></div>
                        </div>
                        <SocialLogin></SocialLogin>

                        {/* Bottom */}
                        <p className="text-center text-sm text-neutral-600 mt-6">
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#B08A3C] hover:opacity-80 transition"
                            >
                                Create one
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
