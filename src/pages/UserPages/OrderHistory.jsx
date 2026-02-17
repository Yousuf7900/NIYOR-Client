import { useMemo, useState } from "react";
import { FiSearch, FiCopy, FiCheck, FiEye, FiTruck, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Link } from "react-router";

const OrderHistory = () => {
    // UI-only dummy data (replace later)
    const orders = useMemo(
        () => [
            {
                _id: "1",
                orderId: "NIY-10021",
                createdAt: "Tue, 17 Feb 2026 10:21:00 GMT",
                total: 5890,
                items: 2,
                payment: "COD",
                status: "pending", // pending | confirmed | shipped | delivered | cancelled
            },
            {
                _id: "2",
                orderId: "NIY-10022",
                createdAt: "Tue, 17 Feb 2026 12:44:00 GMT",
                total: 2890,
                items: 1,
                payment: "COD",
                status: "shipped",
            },
            {
                _id: "3",
                orderId: "NIY-10023",
                createdAt: "Mon, 16 Feb 2026 17:37:48 GMT",
                total: 1990,
                items: 1,
                payment: "COD",
                status: "delivered",
            },
            {
                _id: "4",
                orderId: "NIY-10024",
                createdAt: "Mon, 16 Feb 2026 18:10:12 GMT",
                total: 3190,
                items: 1,
                payment: "COD",
                status: "cancelled",
            },
        ],
        []
    );

    const [tab, setTab] = useState("all"); // all | active | delivered | cancelled
    const [q, setQ] = useState("");
    const [copied, setCopied] = useState(null);

    const filtered = useMemo(() => {
        let list = [...orders];

        if (tab === "active") list = list.filter((o) => ["pending", "confirmed", "shipped"].includes(o.status));
        if (tab === "delivered") list = list.filter((o) => o.status === "delivered");
        if (tab === "cancelled") list = list.filter((o) => o.status === "cancelled");

        if (q.trim()) {
            const s = q.toLowerCase();
            list = list.filter((o) => o.orderId.toLowerCase().includes(s));
        }

        return list;
    }, [orders, tab, q]);

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(text);
            setTimeout(() => setCopied(null), 1200);
        } catch {
            // UI-only
        }
    };

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-6 bg-white">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-lg tracking-wide text-neutral-800">Order History</h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Track your orders and see status updates.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-80">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                            <FiSearch />
                        </span>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            type="text"
                            placeholder="Search by Order ID..."
                            className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 flex flex-wrap gap-2">
                    <TabButton active={tab === "all"} onClick={() => setTab("all")}>
                        All
                    </TabButton>
                    <TabButton active={tab === "active"} onClick={() => setTab("active")}>
                        Active
                    </TabButton>
                    <TabButton active={tab === "delivered"} onClick={() => setTab("delivered")}>
                        Delivered
                    </TabButton>
                    <TabButton active={tab === "cancelled"} onClick={() => setTab("cancelled")}>
                        Cancelled
                    </TabButton>
                </div>

                {/* Mobile Cards */}
                <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
                    {filtered.map((o) => (
                        <div key={o._id} className="rounded-md border border-neutral-200 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-neutral-800 font-medium truncate">{o.orderId}</p>

                                        <button
                                            type="button"
                                            onClick={() => handleCopy(o.orderId)}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                                            title="Copy Order ID"
                                            aria-label="Copy Order ID"
                                        >
                                            {copied === o.orderId ? <FiCheck className="text-[14px]" /> : <FiCopy className="text-[14px]" />}
                                        </button>
                                    </div>

                                    <p className="text-[12px] text-neutral-500 mt-1">
                                        {formatDate(o.createdAt)} • {o.items} item{o.items > 1 ? "s" : ""}
                                    </p>
                                </div>

                                <OrderStatusBadge status={o.status} />
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-sm text-neutral-800 font-medium">৳ {o.total}</p>

                                <button
                                    type="button"
                                    className="px-3 py-2 text-xs rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition inline-flex items-center gap-2"
                                >
                                    <FiEye /> Details
                                </button>
                            </div>

                            {copied === o.orderId && (
                                <p className="mt-2 text-[11px] text-[#B08A3C]">Copied!</p>
                            )}
                        </div>
                    ))}

                    {!filtered.length && (
                        <div className="rounded-md border border-neutral-200 p-10 text-center text-sm text-neutral-500">
                            No orders found.
                        </div>
                    )}
                </div>

                {/* Desktop Table */}
                <div className="mt-6 overflow-x-auto border border-neutral-200 rounded-md hidden md:block">
                    <table className="table w-full">
                        <thead className="bg-neutral-50">
                            <tr className="text-xs tracking-[0.2em] text-neutral-500">
                                <th className="font-medium">ORDER</th>
                                <th className="font-medium">DATE</th>
                                <th className="font-medium">ITEMS</th>
                                <th className="font-medium">TOTAL</th>
                                <th className="font-medium">STATUS</th>
                                <th className="font-medium text-right">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((o) => (
                                <tr key={o._id} className="hover:bg-neutral-50">
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-neutral-800 font-medium">{o.orderId}</p>

                                            <button
                                                type="button"
                                                onClick={() => handleCopy(o.orderId)}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                                                title="Copy Order ID"
                                                aria-label="Copy Order ID"
                                            >
                                                {copied === o.orderId ? <FiCheck className="text-[14px]" /> : <FiCopy className="text-[14px]" />}
                                            </button>

                                            {copied === o.orderId && (
                                                <span className="text-[11px] text-[#B08A3C]">Copied!</span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="text-sm text-neutral-600">{formatDate(o.createdAt)}</td>
                                    <td className="text-sm text-neutral-600">{o.items}</td>
                                    <td className="text-sm text-neutral-800 font-medium">৳ {o.total}</td>
                                    <td>
                                        <OrderStatusBadge status={o.status} />
                                    </td>

                                    <td>
                                        <div className="flex items-center justify-end">
                                            <Link to={'/dashboard/order-details'}
                                                type="button"
                                                className="px-3 py-2 text-xs rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition inline-flex items-center gap-2"
                                            >
                                                <FiEye /> View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {!filtered.length && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-sm text-neutral-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Tip */}
                <p className="mt-4 text-xs text-neutral-400">
                    Tip: Keep your Order ID saved—support can help faster with it.
                </p>
            </div>
        </div>
    );
};

export default OrderHistory;

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

const OrderStatusBadge = ({ status }) => {
    const map = {
        pending: { cls: "border-neutral-200 text-neutral-700", icon: <FiClock /> },
        confirmed: { cls: "border-[#B08A3C]/30 text-[#B08A3C]", icon: <FiCheckCircle /> },
        shipped: { cls: "border-[#B08A3C]/30 text-[#B08A3C]", icon: <FiTruck /> },
        delivered: { cls: "border-[#B08A3C]/30 text-[#B08A3C]", icon: <FiCheckCircle /> },
        cancelled: { cls: "border-red-200 text-red-500", icon: <FiXCircle /> },
    };

    const cfg = map[status] || map.pending;

    return (
        <span className={`text-xs px-3 py-1 rounded-full border tracking-wide inline-flex items-center gap-2 ${cfg.cls}`}>
            <span className="text-sm">{cfg.icon}</span>
            {status}
        </span>
    );
};

const formatDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" });
};
