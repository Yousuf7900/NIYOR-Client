import { FiSearch, FiShoppingBag, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Img1 from "../assets/Images/1.webp";
import Img2 from "../assets/Images/2.webp";
import Img3 from "../assets/Images/3.webp";
import Img4 from "../assets/Images/4.webp";
import Img5 from "../assets/Images/5.webp";
import Img6 from "../assets/Images/6.webp";
import { Helmet } from "react-helmet-async";

const products = [
    { id: 1, name: "Classic White Panjabi", fabric: "Khadi Blend", price: 2890, image: Img1, tag: "NEW" },
    { id: 2, name: "Sand Minimal Panjabi", fabric: "Cotton Khadi", price: 2790, image: Img2, tag: "BEST" },
    { id: 3, name: "Premium Black Panjabi", fabric: "Textured Cotton", price: 3590, image: Img3, tag: "PREMIUM" },
    { id: 4, name: "Heritage Ivory Panjabi", fabric: "Khadi Feel", price: 3190, image: Img4, tag: "EID" },
    { id: 5, name: "Olive Heritage Panjabi", fabric: "Linen Blend", price: 3290, image: Img5, tag: "LIMITED" },
    { id: 6, name: "Stone Grey Panjabi", fabric: "Breathable Cotton", price: 2690, image: Img6, tag: "NEW" },
    { id: 7, name: "Midnight Blue Panjabi", fabric: "Cotton", price: 3490, image: Img2, tag: "BEST" },
    { id: 8, name: "Warm Beige Panjabi", fabric: "Khadi Touch", price: 2990, image: Img3, tag: "CLASSIC" },
    { id: 9, name: "Soft Cream Panjabi", fabric: "Cotton Khadi", price: 3090, image: Img4, tag: "EID" },
    { id: 10, name: "Minimal White Panjabi", fabric: "Khadi Blend", price: 2890, image: Img1, tag: "ESSENTIAL" },
];

const Shop = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <Helmet>
                <title>NIYOR | নিওর - SHOP</title>
            </Helmet>
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl tracking-[0.25em] text-neutral-800">
                    PANJABI COLLECTION
                </h1>
                <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-sm">
                    NIYOR | নিওর
                </p>
                <p className="mt-5 text-neutral-600 text-sm max-w-2xl mx-auto">
                    Premium Panjabi inspired by heritage—minimal, breathable, and crafted
                    for everyday elegance.
                </p>
            </div>

            {/* UX Bar */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-12">
                {/* Search */}
                <div className="flex items-center gap-2 w-full md:max-w-sm border border-neutral-200 rounded-md px-3 py-2">
                    <FiSearch className="text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search Panjabi..."
                        className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400"
                    />
                </div>

                {/* Filter */}
                <div className="flex gap-3 flex-wrap">
                    <button className="px-4 py-2 text-sm border border-neutral-200 rounded-md text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors">
                        All
                    </button>
                    <button className="px-4 py-2 text-sm border border-neutral-200 rounded-md text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors">
                        Khadi
                    </button>
                    <button className="px-4 py-2 text-sm border border-neutral-200 rounded-md text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors">
                        Eid
                    </button>
                    <button className="px-4 py-2 text-sm border border-neutral-200 rounded-md text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors">
                        Premium
                    </button>
                </div>

                {/* Sort */}
                <div className="md:ml-auto w-full md:w-auto">
                    <select className="w-full md:w-auto border border-neutral-200 rounded-md px-4 py-2 text-sm text-neutral-600 outline-none">
                        <option>Sort: Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="group border border-neutral-200 rounded-md overflow-hidden hover:shadow-md transition-all duration-500 bg-white"
                    >
                        {/* Image */}
                        <div className="relative aspect-3/4 overflow-hidden bg-neutral-100">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Tag */}
                            <div className="absolute top-4 left-4">
                                <span className="text-[11px] tracking-[0.25em] px-3 py-1 bg-white/95 border border-neutral-200 rounded-full text-neutral-700">
                                    {p.tag}
                                </span>
                            </div>

                            {/* Quick Add */}
                            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm tracking-wide border border-[#B08A3C] text-[#B08A3C] bg-white hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md">
                                    <FiShoppingBag />
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-2 text-center">
                            <h2 className="text-neutral-800 text-sm tracking-wide">{p.name}</h2>
                            <p className="text-neutral-500 text-xs tracking-wide">{p.fabric}</p>
                            <p className="text-[#B08A3C] font-medium">
                                ৳ {p.price.toLocaleString("en-BD")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom note */}
            <div className="mt-16 text-center text-sm text-neutral-500">
                Showing <span className="text-neutral-700">{products.length}</span> items
            </div>

            {/* Dummy Pagination */}
            <div className="mt-10 flex items-center justify-center gap-2">
                <button
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-neutral-200 text-neutral-500 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
                    aria-label="Previous Page"
                >
                    <FiChevronLeft />
                </button>

                <button className="w-10 h-10 rounded-md border border-[#B08A3C] text-[#B08A3C]">
                    1
                </button>
                <button className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors">
                    2
                </button>
                <button className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors">
                    3
                </button>

                <span className="px-2 text-neutral-400">…</span>

                <button className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors">
                    10
                </button>

                <button
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-neutral-200 text-neutral-500 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
                    aria-label="Next Page"
                >
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Shop;
