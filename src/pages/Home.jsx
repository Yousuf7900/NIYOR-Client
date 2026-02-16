import { Link } from "react-router";
import {
    FiArrowRight,
    FiTruck,
    FiShield,
    FiRefreshCcw,
    FiStar,
    FiMail,
} from "react-icons/fi";

import Img1 from "../assets/Images/1.webp";
import Img2 from "../assets/Images/2.webp";
import Img3 from "../assets/Images/3.webp";
import Img4 from "../assets/Images/4.webp";
import Img5 from "../assets/Images/5.webp";
import Img6 from "../assets/Images/6.webp";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const featured = [
        { id: 1, name: "Classic White Panjabi", price: 2890, img: Img1, tag: "NEW" },
        { id: 2, name: "Heritage Ivory Panjabi", price: 3190, img: Img2, tag: "BEST" },
        { id: 3, name: "Premium Black Panjabi", price: 3590, img: Img3, tag: "PREMIUM" },
    ];

    const bestSellers = [
        { id: 4, name: "Khadi Sand Panjabi", price: 2790, img: Img4, tag: "ESSENTIAL" },
        { id: 5, name: "Warm Beige Panjabi", price: 2990, img: Img5, tag: "LIMITED" },
        { id: 6, name: "Stone Grey Panjabi", price: 2690, img: Img6, tag: "BEST" },
        { id: 7, name: "Midnight Blue Panjabi", price: 3490, img: Img2, tag: "POPULAR" },
    ];

    return (
        <div className="bg-white">
            <Helmet>
                <title>NIYOR | নিওর - HOME</title>
            </Helmet>
            {/* HERO */}
            <section className="max-w-7xl mx-auto px-4 pt-10 pb-16">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* Text */}
                    <div className="order-2 lg:order-1">
                        <p className="text-[#B08A3C] tracking-[0.35em] text-sm">
                            NIYOR | নিওর
                        </p>

                        <h1 className="mt-5 text-4xl md:text-5xl font-light tracking-[0.18em] text-neutral-900 leading-tight">
                            Redefining <br className="hidden md:block" />
                            Bengali Elegance
                        </h1>

                        <p className="mt-6 text-neutral-600 max-w-xl leading-relaxed">
                            Premium Panjabi crafted with heritage-inspired fabrics and modern
                            minimal design—made for everyday grace and special moments.
                        </p>

                        <p className="mt-3 text-neutral-500 leading-relaxed">
                            ঐতিহ্য, রুচি এবং আধুনিকতার মিশেলে—আপনার জন্য নিওরের বিশেষ
                            পান্জাবি সংগ্রহ।
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#B08A3C] text-[#B08A3C] hover:bg-[#B08A3C] hover:text-white transition-all duration-300 text-sm tracking-wide rounded-md"
                            >
                                Explore Collection <FiArrowRight />
                            </Link>

                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-all duration-300 text-sm tracking-wide rounded-md"
                            >
                                Our Story <FiArrowRight />
                            </Link>
                        </div>

                        {/* Trust strip */}
                        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                            <div className="border border-neutral-200 rounded-md py-4">
                                <p className="text-neutral-900 text-sm tracking-wide">Premium</p>
                                <p className="text-neutral-500 text-xs mt-1">Fabrics</p>
                            </div>
                            <div className="border border-neutral-200 rounded-md py-4">
                                <p className="text-neutral-900 text-sm tracking-wide">Minimal</p>
                                <p className="text-neutral-500 text-xs mt-1">Design</p>
                            </div>
                            <div className="border border-neutral-200 rounded-md py-4">
                                <p className="text-neutral-900 text-sm tracking-wide">BD</p>
                                <p className="text-neutral-500 text-xs mt-1">Crafted</p>
                            </div>
                        </div>
                    </div>

                    {/* Image (Aspect ratio prevents crop) */}
                    <div className="order-1 lg:order-2">
                        <div className="relative overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
                            <div className="aspect-3/4">
                                <img
                                    src={Img1}
                                    alt="NIYOR Hero"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* subtle overlay badge */}
                            <div className="absolute top-4 left-4">
                                <span className="text-[11px] tracking-[0.25em] px-3 py-1 bg-white/95 border border-neutral-200 rounded-full text-neutral-700">
                                    NEW DROP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* USP BAR */}
            <section className="border-y border-neutral-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex items-start gap-3">
                        <FiTruck className="text-[#B08A3C] mt-1" />
                        <div>
                            <p className="text-neutral-900 tracking-wide">Fast Delivery</p>
                            <p className="text-neutral-500 text-sm mt-1">
                                Delivered across Bangladesh.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FiShield className="text-[#B08A3C] mt-1" />
                        <div>
                            <p className="text-neutral-900 tracking-wide">Quality Promise</p>
                            <p className="text-neutral-500 text-sm mt-1">
                                Premium fabrics & finishing.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FiRefreshCcw className="text-[#B08A3C] mt-1" />
                        <div>
                            <p className="text-neutral-900 tracking-wide">Easy Exchange</p>
                            <p className="text-neutral-500 text-sm mt-1">
                                Hassle-free support for issues.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl tracking-[0.25em] text-neutral-800">FEATURED</h2>
                    <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-sm">
                        Selected for you
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {featured.map((p) => (
                        <div
                            key={p.id}
                            className="group border border-neutral-200 rounded-md overflow-hidden hover:shadow-md transition-all duration-500 bg-white"
                        >
                            <div className="relative bg-neutral-50">
                                <div className="aspect-3/4">
                                    <img
                                        src={p.img}
                                        alt={p.name}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="absolute top-4 left-4">
                                    <span className="text-[11px] tracking-[0.25em] px-3 py-1 bg-white/95 border border-neutral-200 rounded-full text-neutral-700">
                                        {p.tag}
                                    </span>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <Link
                                        to="/shop"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm tracking-wide border border-[#B08A3C] text-[#B08A3C] bg-white hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md"
                                    >
                                        View in Shop <FiArrowRight />
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 text-center space-y-2">
                                <h3 className="text-neutral-800 text-sm tracking-wide">{p.name}</h3>
                                <p className="text-[#B08A3C] font-medium">
                                    ৳ {p.price.toLocaleString("en-BD")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* STORY STRIP */}
            <section className="bg-neutral-50 border-y border-neutral-200">
                <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                    <h2 className="text-2xl tracking-wide text-neutral-800">
                        Where Heritage Meets Minimalism
                    </h2>
                    <p className="mt-6 text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                        Every NIYOR piece is designed to feel calm, refined, and timeless.
                        Not loud—just confident.
                    </p>
                    <p className="mt-3 text-neutral-500 leading-relaxed max-w-3xl mx-auto">
                        নিওর বিশ্বাস করে পোশাক হবে নীরব আত্মবিশ্বাসের ভাষা—যেখানে ঐতিহ্য ও আধুনিকতা একসাথে।
                    </p>

                    <Link
                        to="/about"
                        className="inline-block mt-8 text-[#B08A3C] border-b border-[#B08A3C] pb-1 hover:opacity-70 transition"
                    >
                        Read our story →
                    </Link>
                </div>
            </section>

            {/* BEST SELLERS */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex items-end justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-2xl tracking-[0.18em] text-neutral-800">
                            BEST SELLERS
                        </h2>
                        <p className="mt-2 text-neutral-500 text-sm">
                            Most loved by our customers
                        </p>
                    </div>

                    <Link
                        to="/shop"
                        className="text-[#B08A3C] text-sm hover:opacity-80 transition"
                    >
                        View all →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {bestSellers.map((p) => (
                        <div
                            key={p.id}
                            className="border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-all duration-500"
                        >
                            <div className="bg-neutral-50">
                                <div className="aspect-3/4">
                                    <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                                </div>
                            </div>
                            <div className="p-5 text-center space-y-2">
                                <p className="text-neutral-800 text-sm tracking-wide">{p.name}</p>
                                <p className="text-[#B08A3C] font-medium">
                                    ৳ {p.price.toLocaleString("en-BD")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SOCIAL PROOF */}
            <section className="bg-white border-t border-neutral-200 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl tracking-[0.18em] text-neutral-800">
                            WHAT PEOPLE SAY
                        </h2>
                        <p className="mt-3 text-neutral-500 text-sm">
                            Real words from our customers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                name: "Rahim",
                                text: "The fabric quality feels premium and the fitting is perfect. Looks super classy.",
                            },
                            {
                                name: "Sabbir",
                                text: "Minimal and elegant. Exactly the vibe I wanted. Delivery was quick too.",
                            },
                            {
                                name: "Nafi",
                                text: "NIYOR feels like a real brand. The finishing is clean and comfortable.",
                            },
                        ].map((t, i) => (
                            <div
                                key={i}
                                className="border border-neutral-200 rounded-md p-8 bg-white"
                            >
                                <div className="flex items-center gap-1 text-[#B08A3C]">
                                    <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                                </div>
                                <p className="mt-5 text-neutral-600 leading-relaxed">
                                    “{t.text}”
                                </p>
                                <p className="mt-6 text-neutral-800 tracking-wide text-sm">
                                    — {t.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="bg-neutral-50 border-t border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl tracking-wide text-neutral-800">
                                Join the NIYOR Circle
                            </h2>
                            <p className="mt-4 text-neutral-600 leading-relaxed">
                                Get early access to new drops, special offers, and style updates.
                            </p>
                            <p className="mt-2 text-neutral-500 leading-relaxed">
                                নতুন কালেকশন ও অফারের খবর আগে পেতে সাবস্ক্রাইব করুন।
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex items-center gap-2 w-full border border-neutral-200 bg-white rounded-md px-3 py-2">
                                <FiMail className="text-neutral-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400"
                                />
                            </div>
                            <button className="px-6 py-3 bg-[#B08A3C] text-white rounded-md hover:opacity-90 transition text-sm tracking-wide">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-[#111] py-20 text-center">
                <p className="text-[#E5C98B] tracking-[0.3em] text-xs">NIYOR | নিওর</p>
                <h2 className="mt-4 text-white text-3xl tracking-wide">
                    Discover Your Signature Look
                </h2>
                <Link
                    to="/shop"
                    className="inline-block mt-8 px-8 py-3 bg-[#B08A3C] text-white hover:opacity-90 transition rounded-md"
                >
                    Shop Now
                </Link>
            </section>
        </div>
    );
};

export default Home;
