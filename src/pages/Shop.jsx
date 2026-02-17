import { FiShoppingBag } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router";
import useProducts from "../hooks/useProducts";

const Shop = () => {
    const [products] = useProducts();
    const navigate = useNavigate();

    const handleBuyNow = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (product) => {
        // later: call cart api
        console.log("Add to cart:", product?._id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <Helmet>
                <title>NIYOR | নিওর - SHOP</title>
            </Helmet>

            {/* Header */}
            <div className="text-center mb-16">
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

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                {products.map((p) => {
                    const img = p.images?.[0];
                    const inStock = !!p.inStock && (p.stockQty ?? 0) > 0;

                    return (
                        <div
                            key={p._id}
                            className="group border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow duration-500"
                        >
                            {/* Image (clickable) */}
                            <Link to={`/product/${p._id}`} className="block">
                                <div className="relative aspect-3/4 overflow-hidden bg-neutral-100">
                                    <img
                                        src={img}
                                        alt={p.name}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />

                                    {/* Tag */}
                                    <div className="absolute top-4 left-4">
                                        <span className="text-[11px] tracking-[0.25em] px-3 py-1 bg-white/95 border border-neutral-200 rounded-full text-neutral-700">
                                            {p.category}
                                        </span>
                                    </div>

                                    {/* Stock badge */}
                                    {!inStock && (
                                        <div className="absolute top-4 right-4">
                                            <span className="text-[11px] tracking-[0.25em] px-3 py-1 bg-white/95 border border-neutral-200 rounded-full text-neutral-500">
                                                OUT OF STOCK
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-6 text-center">
                                {/* Title (clickable) */}
                                <Link to={`/product/${p._id}`} className="block">
                                    <h2 className="text-neutral-800 text-sm tracking-wide line-clamp-1 hover:text-[#B08A3C] transition-colors">
                                        {p.name}
                                    </h2>
                                </Link>

                                <p className="mt-2 text-[#B08A3C] font-medium">
                                    ৳ {Number(p.price).toLocaleString("en-BD")}
                                </p>

                                {/* Meta line (stock + sold) */}
                                <div className="mt-4 flex items-center justify-center gap-3 text-[11px] tracking-[0.2em] text-neutral-400">
                                    <span>
                                        {inStock
                                            ? `IN STOCK • ${p.stockQty} AVAILABLE`
                                            : "CURRENTLY UNAVAILABLE"}
                                    </span>

                                    <span className="w-1 h-1 rounded-full bg-neutral-300" />

                                    <span>
                                        {typeof p.soldQty === "number"
                                            ? `SOLD • ${p.soldQty}`
                                            : "SOLD • —"}
                                    </span>
                                </div>

                                {/* Actions (mobile friendly) */}
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleBuyNow(p._id)}
                                        disabled={!inStock}
                                        className="w-full px-4 py-3 text-sm tracking-wide rounded-md border border-[#B08A3C] text-white bg-[#B08A3C] hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {inStock ? "Buy Now" : "Out of Stock"}
                                    </button>

                                    <button
                                        onClick={() => handleAddToCart(p)}
                                        disabled={!inStock}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm tracking-wide rounded-md border border-[#B08A3C] text-[#B08A3C] bg-white hover:bg-[#B08A3C] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiShoppingBag />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom note */}
            <div className="mt-16 text-center text-sm text-neutral-500">
                Showing <span className="text-neutral-700">{products.length}</span> items
            </div>
        </div>
    );
};

export default Shop;
