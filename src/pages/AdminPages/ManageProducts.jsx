import { useMemo, useState } from "react";
import {
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiPlus,
    FiChevronDown,
    FiPackage,
    FiEye,
    FiEyeOff,
} from "react-icons/fi";
import { Link } from "react-router";
import useProducts from "../../hooks/useProducts";

const ManageProducts = () => {
    const [products] = useProducts();
    const productsList = products;

    // UI-only filters
    const [tab, setTab] = useState("all"); // all | published | draft | low
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        let list = [...productsList];

        if (tab === "published") list = list.filter((p) => p.status === "published");
        if (tab === "draft") list = list.filter((p) => p.status === "draft");
        if (tab === "low") list = list.filter((p) => p.stock <= 5);

        if (q.trim()) {
            const s = q.toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(s) ||
                    (p.sku || "").toLowerCase().includes(s) ||
                    (p.category || "").toLowerCase().includes(s)
            );
        }

        return list;
    }, [productsList, tab, q]);

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-6 bg-white">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-lg tracking-wide text-neutral-800">Manage Products</h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Update, publish, or remove products from your store.
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
                        <Link to={'/dashboard/add-products'}
                            type="button"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                        >
                            <FiPlus />
                            Add Product
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 flex flex-wrap gap-2">
                    <TabButton active={tab === "all"} onClick={() => setTab("all")}>
                        All
                    </TabButton>
                    <TabButton active={tab === "published"} onClick={() => setTab("published")}>
                        Published
                    </TabButton>
                    <TabButton active={tab === "draft"} onClick={() => setTab("draft")}>
                        Draft
                    </TabButton>
                    <TabButton active={tab === "low"} onClick={() => setTab("low")}>
                        Low Stock
                    </TabButton>

                    <div className="ml-auto text-sm text-neutral-500 flex items-center gap-2">
                        <FiPackage className="text-neutral-400" />
                        Total: <span className="text-neutral-800 font-medium">{products.length}</span>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-6 overflow-x-auto border border-neutral-200 rounded-md">
                    <table className="table w-full">
                        <thead className="bg-neutral-50">
                            <tr className="text-xs tracking-[0.2em] text-neutral-500">
                                <th className="font-medium">PRODUCT</th>
                                <th className="font-medium hidden md:table-cell">CATEGORY</th>
                                <th className="font-medium">PRICE</th>
                                <th className="font-medium">STOCK</th>
                                <th className="font-medium hidden lg:table-cell">STATUS</th>
                                <th className="font-medium text-right">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((p) => (
                                <tr key={p._id} className="hover:bg-neutral-50">
                                    {/* Product */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-md border border-[#B08A3C]/40 overflow-hidden bg-[#B08A3C]/10 flex items-center justify-center">
                                                {p.image ? (
                                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <FiPackage className="text-[#B08A3C]" />
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm text-neutral-800 font-medium truncate">{p.name}</p>
                                                <p className="text-[12px] text-neutral-500 truncate">SKU: {p.sku || "—"}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="hidden md:table-cell">
                                        <p className="text-sm text-neutral-600">{p.category || "—"}</p>
                                    </td>

                                    {/* Price */}
                                    <td>
                                        <p className="text-sm text-neutral-800 font-medium">৳ {p.price}</p>
                                    </td>

                                    {/* Stock */}
                                    <td>
                                        <StockBadge stock={p.stock} />
                                    </td>

                                    {/* Status */}
                                    <td className="hidden lg:table-cell">
                                        <StatusBadge status={p.status} />
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Publish toggle (UI only) */}
                                            <button
                                                type="button"
                                                className="px-3 py-2 text-xs rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition inline-flex items-center gap-2"
                                                title="Toggle publish (UI only)"
                                            >
                                                {p.status === "published" ? (
                                                    <>
                                                        <FiEyeOff /> Unpublish
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiEye /> Publish
                                                    </>
                                                )}
                                            </button>

                                            {/* Edit */}
                                            <button
                                                type="button"
                                                className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                                                title="Edit"
                                                aria-label="Edit"
                                            >
                                                <FiEdit2 />
                                            </button>

                                            {/* Delete */}
                                            <button
                                                type="button"
                                                className="w-10 h-10 rounded-md border border-red-200 text-red-500 hover:border-red-300 transition inline-flex items-center justify-center"
                                                title="Delete"
                                                aria-label="Delete"
                                            >
                                                <FiTrash2 />
                                            </button>

                                            {/* More (optional UI) */}
                                            <div className="dropdown dropdown-end">
                                                <button
                                                    type="button"
                                                    className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                                                    title="More"
                                                    aria-label="More"
                                                >
                                                    <FiChevronDown />
                                                </button>

                                                <ul className="dropdown-content z-50 mt-2 w-44 menu bg-white border border-neutral-200 shadow-md rounded-md p-2">
                                                    <li>
                                                        <button className="text-sm text-neutral-700 hover:text-[#B08A3C]">
                                                            Duplicate (UI)
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="text-sm text-neutral-700 hover:text-[#B08A3C]">
                                                            View details (UI)
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {!filtered.length && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-sm text-neutral-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer hint */}
                <p className="mt-4 text-xs text-neutral-400">
                    Tip: Use “Draft” instead of deleting to preserve order history and analytics.
                </p>
            </div>
        </div>
    );
};

export default ManageProducts;

/* ---------- UI pieces ---------- */

const TabButton = ({ active, onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 text-sm rounded-md border transition-colors
      ${active
                ? "border-[#B08A3C] text-[#B08A3C]"
                : "border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C]"
            }
    `}
    >
        {children}
    </button>
);

const StatusBadge = ({ status }) => {
    const isDraft = status === "draft";
    return (
        <span
            className={`text-xs px-3 py-1 rounded-full border tracking-wide
        ${isDraft ? "border-neutral-200 text-neutral-700" : "border-[#B08A3C]/30 text-[#B08A3C]"}
      `}
        >
            {status || "draft"}
        </span>
    );
};

const StockBadge = ({ stock }) => {
    const isOut = stock === 0;
    const isLow = stock > 0 && stock <= 5;

    return (
        <span
            className={`text-xs px-3 py-1 rounded-full border tracking-wide
        ${isOut
                    ? "border-red-200 text-red-500"
                    : isLow
                        ? "border-neutral-200 text-neutral-700"
                        : "border-[#B08A3C]/30 text-[#B08A3C]"
                }
      `}
        >
            {isOut ? "Out of stock" : isLow ? `Low (${stock})` : `In stock (${stock})`}
        </span>
    );
};
