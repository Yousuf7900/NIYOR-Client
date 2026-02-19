import { useMemo, useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useProducts from "../../hooks/useProducts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FALLBACK_IMG = "https://i.ibb.co/9y0JmZQ/placeholder-product.png";

const ManageProducts = () => {
    const axiosSecure = useAxiosSecure();

    const [products] = useProducts(); // from hook
    const [productsList, setProductsList] = useState([]); // local list for instant UI updates

    // sync hook products -> local list
    useEffect(() => {
        setProductsList(products || []);
    }, [products]);

    // UI-only search
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        let list = [...productsList];

        if (q.trim()) {
            const s = q.toLowerCase();
            list = list.filter(
                (p) =>
                    (p.name || "").toLowerCase().includes(s) ||
                    (p.sku || "").toLowerCase().includes(s) ||
                    (p.category || "").toLowerCase().includes(s)
            );
        }

        return list;
    }, [productsList, q]);

    const handleDelete = async (p) => {
        const confirm = await Swal.fire({
            title: "Delete this product?",
            text: `This will permanently remove "${p?.name || "this product"}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#B08A3C",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/api/products/${p._id}`);

            const ok =
                res?.data?.deletedCount > 0 || res?.data?.message === "Product deleted";

            if (ok) {
                setProductsList((prev) => prev.filter((item) => item._id !== p._id));

                await Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#B08A3C",
                });
            } else {
                Swal.fire({
                    title: "Not deleted",
                    text: "Something went wrong.",
                    icon: "error",
                    confirmButtonColor: "#B08A3C",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Failed",
                text: error?.response?.data?.message || "Server error while deleting.",
                icon: "error",
                confirmButtonColor: "#B08A3C",
            });
        }
    };

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-6 bg-white">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-lg tracking-wide text-neutral-800">
                            Manage Products
                        </h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            View, edit, or remove products from your store.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        {/* Search */}
                        <div className="relative w-full sm:w-80">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                <FiSearch />
                            </span>
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                type="text"
                                placeholder="Search by name, SKU, category..."
                                className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition"
                            />
                        </div>

                        {/* Add product */}
                        <Link
                            to={"/dashboard/add-products"}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                        >
                            + Add Product
                        </Link>
                    </div>
                </div>

                {/* Count */}
                <div className="mt-6 text-sm text-neutral-500 flex items-center gap-2">
                    Total:{" "}
                    <span className="text-neutral-800 font-medium">
                        {productsList.length}
                    </span>
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto border border-neutral-200 rounded-md">
                    <table className="table w-full">
                        <thead className="bg-neutral-50">
                            <tr className="text-xs tracking-[0.2em] text-neutral-500">
                                <th className="font-medium w-14">SL</th>
                                <th className="font-medium">PRODUCT</th>
                                <th className="font-medium hidden md:table-cell">CATEGORY</th>
                                <th className="font-medium">PRICE</th>
                                <th className="font-medium">STOCK</th>
                                <th className="font-medium">SOLD</th>
                                <th className="font-medium text-right">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((p, idx) => {
                                const sold =
                                    p?.soldQty ?? p?.sold ?? p?.totalSold ?? p?.sales ?? 0;

                                return (
                                    <tr key={p._id || idx} className="hover:bg-neutral-50">
                                        {/* SL */}
                                        <td className="text-sm text-neutral-600">{idx + 1}</td>

                                        {/* Product */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-md border border-[#B08A3C]/40 overflow-hidden bg-[#B08A3C]/10 flex items-center justify-center">
                                                    <img
                                                        src={p.image || p.images?.[0] || FALLBACK_IMG}
                                                        alt={p.name || "Product"}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = FALLBACK_IMG;
                                                        }}
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-sm text-neutral-800 font-medium truncate">
                                                        {p.name || "Unnamed Product"}
                                                    </p>
                                                    <p className="text-[12px] text-neutral-500 truncate">
                                                        SKU: {p.sku || "—"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="hidden md:table-cell">
                                            <p className="text-sm text-neutral-600">
                                                {p.category || "—"}
                                            </p>
                                        </td>

                                        {/* Price + Discount */}
                                        <td>
                                            <div className="text-sm whitespace-nowrap">
                                                <span className="text-neutral-800 font-medium">
                                                    ৳ {p.price ?? "—"}
                                                </span>
                                                {p.discountPrice ? (
                                                    <span className="ml-2 text-neutral-500 text-xs">
                                                        ৳ {p.discountPrice}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </td>

                                        {/* Stock */}
                                        <td>
                                            <span className="text-sm text-neutral-700 whitespace-nowrap">
                                                {p.stock ?? 0}
                                            </span>
                                        </td>

                                        {/* Sold */}
                                        <td>
                                            <span className="text-sm text-neutral-700 whitespace-nowrap">
                                                {sold}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <div className="flex items-center justify-end gap-2">
                                                {/* View details */}
                                                <Link
                                                    to={`/dashboard/manage-products/${p._id}`}
                                                    className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                                                    title="View details"
                                                    aria-label="View details"
                                                >
                                                    <FiEye />
                                                </Link>

                                                {/* Edit */}
                                                <Link
                                                    to={`/dashboard/edit-product/${p._id}`}
                                                    className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                                                    title="Edit"
                                                    aria-label="Edit"
                                                >
                                                    <FiEdit2 />
                                                </Link>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(p)}
                                                    className="w-10 h-10 rounded-md border border-red-200 text-red-500 hover:border-red-300 transition inline-flex items-center justify-center"
                                                    title="Delete"
                                                    aria-label="Delete"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {!filtered.length && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-12 text-sm text-neutral-500"
                                    >
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="mt-4 text-xs text-neutral-400">
                    Tip: Keep SKU unique for faster search and better tracking.
                </p>
            </div>
        </div>
    );
};

export default ManageProducts;
