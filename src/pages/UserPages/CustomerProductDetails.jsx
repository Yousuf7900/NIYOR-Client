// pages/products/CustomerProductDetails.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { FiArrowLeft, FiPackage } from "react-icons/fi";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FALLBACK_IMG =
    "https://i.ibb.co/9y0JmZQ/placeholder-product.png";

const CustomerProductDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const [product, setProduct] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                const res = await axiosPublic.get(`/api/products/${id}`);
                if (mounted) setProduct(res.data);
            } catch (e) {
                console.log(e);
                if (mounted) setProduct(null);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => (mounted = false);
    }, [axiosPublic, id]);

    const images = useMemo(() => {
        if (!product) return [FALLBACK_IMG];
        const list = [];
        if (product.image) list.push(product.image);
        if (Array.isArray(product.images)) list.push(...product.images);
        const uniq = Array.from(new Set(list.filter(Boolean)));
        return uniq.length ? uniq : [FALLBACK_IMG];
    }, [product]);

    const price = product?.price ?? "—";
    const discountPrice = product?.discountPrice ?? null;
    const stock = product?.stock ?? 0;
    const sold = product?.soldQty ?? product?.sold ?? product?.totalSold ?? product?.sales ?? 0;

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-6 bg-white">
                {/* top */}
                <div className="flex items-center justify-between gap-3">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B08A3C] transition"
                    >
                        <FiArrowLeft /> Back to shop
                    </Link>

                    <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
                        <FiPackage className="text-neutral-400" />
                        <span>Product Details</span>
                    </div>
                </div>

                {loading && <div className="mt-8 text-sm text-neutral-500">Loading...</div>}

                {!loading && !product && (
                    <div className="mt-8 text-sm text-neutral-500">Product not found.</div>
                )}

                {!loading && product && (
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* images */}
                        <div className="border border-neutral-200 rounded-md p-4">
                            <div className="w-full aspect-square rounded-md border border-[#B08A3C]/30 overflow-hidden bg-[#B08A3C]/10">
                                <img
                                    src={images[activeImg] || FALLBACK_IMG}
                                    alt={product?.name || "Product"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                                />
                            </div>

                            <div className="mt-4 flex gap-2 overflow-x-auto">
                                {images.map((img, i) => (
                                    <button
                                        key={img + i}
                                        type="button"
                                        onClick={() => setActiveImg(i)}
                                        className={`w-14 h-14 rounded-md overflow-hidden border shrink-0 transition ${i === activeImg
                                                ? "border-[#B08A3C]"
                                                : "border-neutral-200 hover:border-[#B08A3C]/70"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`thumb-${i}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* details */}
                        <div className="border border-neutral-200 rounded-md p-6">
                            <h1 className="text-xl text-neutral-800 tracking-wide font-medium">
                                {product?.name}
                            </h1>

                            <p className="text-sm text-neutral-500 mt-1">
                                SKU: <span className="text-neutral-700">{product?.sku || "—"}</span>
                                <span className="mx-2 text-neutral-300">•</span>
                                Category: <span className="text-neutral-700">{product?.category || "—"}</span>
                            </p>

                            {/* price */}
                            <div className="mt-5 flex items-end gap-3">
                                <p className="text-2xl text-neutral-800 font-semibold">৳ {price}</p>
                                {discountPrice ? (
                                    <p className="text-sm text-neutral-500 line-through">৳ {discountPrice}</p>
                                ) : null}
                            </div>

                            {/* stock/sold */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <MiniCard label="Stock" value={stock} />
                                <MiniCard label="Sold" value={sold} />
                            </div>

                            {/* description */}
                            <div className="mt-6">
                                <h3 className="text-xs tracking-[0.2em] text-neutral-500">DESCRIPTION</h3>
                                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                                    {product?.description || "No description added yet."}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    type="button"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                                >
                                    Add to Wishlist
                                </button>
                            </div>

                            <p className="mt-4 text-xs text-neutral-400">
                                Note: Delivery & availability depends on location.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerProductDetails;

const MiniCard = ({ label, value }) => (
    <div className="border border-neutral-200 rounded-md p-3">
        <p className="text-xs tracking-[0.2em] text-neutral-500">{label}</p>
        <p className="mt-1 text-sm text-neutral-800 font-medium">{value}</p>
    </div>
);
