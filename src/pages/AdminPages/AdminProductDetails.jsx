import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { FiArrowLeft, FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FALLBACK_IMG =
    "https://i.ibb.co/9y0JmZQ/placeholder-product.png";

const AdminProductDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/api/products/${id}`);
                if (mounted) setProduct(res.data);
            } catch (error) {
                console.error(error);
                if (mounted) setProduct(null);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => (mounted = false);
    }, [axiosSecure, id]);

    // Build image list safely
    const images = useMemo(() => {
        if (!product) return [FALLBACK_IMG];

        const list = [];
        if (product.image) list.push(product.image);
        if (Array.isArray(product.images)) list.push(...product.images);

        const unique = Array.from(new Set(list.filter(Boolean)));
        return unique.length ? unique : [FALLBACK_IMG];
    }, [product]);

    const sold =
        product?.soldQty ??
        product?.sold ??
        product?.totalSold ??
        product?.sales ??
        0;

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-6 bg-white">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/dashboard/manage-products"
                            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B08A3C] transition"
                        >
                            <FiArrowLeft /> Back
                        </Link>

                        <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
                            <FiPackage className="text-neutral-400" />
                            <span>Admin Product Details</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={`/dashboard/edit-product/${product?._id}`}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                        >
                            <FiEdit2 /> Edit
                        </Link>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md border border-red-200 text-red-500 hover:border-red-300 transition"
                        >
                            <FiTrash2 /> Delete
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="mt-8 text-sm text-neutral-500">Loading...</div>
                )}

                {!loading && !product && (
                    <div className="mt-8 text-sm text-neutral-500">
                        Product not found.
                    </div>
                )}

                {!loading && product && (
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT: IMAGE GALLERY */}
                        <div className="lg:col-span-1 border border-neutral-200 rounded-md p-4">
                            <div className="w-full aspect-square rounded-md border border-[#B08A3C]/30 bg-[#B08A3C]/10 flex items-center justify-center overflow-hidden">
                                <img
                                    src={images[activeImg]}
                                    alt={product?.name || "Product"}
                                    className="w-full h-full object-contain p-4 bg-white"
                                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-4 flex gap-2 overflow-x-auto">
                                {images.map((img, i) => (
                                    <button
                                        key={img + i}
                                        type="button"
                                        onClick={() => setActiveImg(i)}
                                        className={`w-16 h-16 rounded-md overflow-hidden border shrink-0 transition ${i === activeImg
                                            ? "border-[#B08A3C]"
                                            : "border-neutral-200 hover:border-[#B08A3C]/70"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`thumb-${i}`}
                                            className="w-full h-full object-contain p-1 bg-white"
                                            onError={(e) =>
                                                (e.currentTarget.src = FALLBACK_IMG)
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: PRODUCT INFO */}
                        <div className="lg:col-span-2 border border-neutral-200 rounded-md p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <h1 className="text-xl text-neutral-800 tracking-wide font-medium truncate">
                                        {product?.name}
                                    </h1>

                                    <p className="text-sm text-neutral-500 mt-1">
                                        SKU:{" "}
                                        <span className="text-neutral-700">
                                            {product?.sku || "—"}
                                        </span>
                                        <span className="mx-2 text-neutral-300">•</span>
                                        Category:{" "}
                                        <span className="text-neutral-700">
                                            {product?.category || "—"}
                                        </span>
                                    </p>
                                </div>

                                <span className="text-xs px-3 py-1 rounded-full border tracking-wide border-[#B08A3C]/30 text-[#B08A3C]">
                                    {product?.status || "—"}
                                </span>
                            </div>

                            {/* Pricing */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <AdminField
                                    label="Price"
                                    value={`৳ ${product?.price ?? "—"}`}
                                />
                                <AdminField
                                    label="Discount Price"
                                    value={
                                        product?.discountPrice
                                            ? `৳ ${product.discountPrice}`
                                            : "—"
                                    }
                                />
                            </div>

                            {/* Stats */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <StatCard label="Stock" value={product?.stock ?? 0} />
                                <StatCard label="Sold" value={sold} />
                                <StatCard label="Product ID" value={product?._id} mono />
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <h3 className="text-xs tracking-[0.2em] text-neutral-500">
                                    DESCRIPTION
                                </h3>
                                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                                    {product?.description ||
                                        "No description added yet."}
                                </p>
                            </div>

                            {/* Meta */}
                            <div className="mt-6 border-t border-neutral-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <AdminField
                                    label="Brand"
                                    value={product?.brand || "—"}
                                />
                                <AdminField
                                    label="Fabric"
                                    value={product?.fabric || "—"}
                                />
                                <AdminField
                                    label="Color"
                                    value={product?.color || "—"}
                                />
                                <AdminField
                                    label="Size"
                                    value={product?.size || "—"}
                                />
                            </div>

                            <p className="mt-4 text-xs text-neutral-400">
                                Tip: Avoid deleting products with orders — archive
                                instead.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProductDetails;

/* ---------- UI COMPONENTS ---------- */

const AdminField = ({ label, value }) => (
    <div className="border border-neutral-200 rounded-md p-3">
        <p className="text-xs tracking-[0.2em] text-neutral-500">
            {label}
        </p>
        <p className="mt-1 text-sm text-neutral-800 font-medium">
            {value}
        </p>
    </div>
);

const StatCard = ({ label, value, mono = false }) => (
    <div className="border border-neutral-200 rounded-md p-3">
        <p className="text-xs tracking-[0.2em] text-neutral-500">
            {label}
        </p>
        <p
            className={`mt-1 text-sm text-neutral-800 font-medium ${mono ? "font-mono text-[12px] break-all" : ""
                }`}
        >
            {value}
        </p>
    </div>
);
