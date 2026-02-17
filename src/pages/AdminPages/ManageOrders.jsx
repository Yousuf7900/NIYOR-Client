import { useMemo, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiEye,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiCopy,
  FiCheck,
} from "react-icons/fi";

const ManageOrders = () => {
  // UI-only dummy data (replace later)
  const orders = useMemo(
    () => [
      {
        _id: "o1",
        orderId: "NIY-10021",
        createdAt: "Tue, 17 Feb 2026 10:21:00 GMT",
        customer: { name: "Aliza Khan", email: "alizakhan@gmail.com", phone: null },
        total: 5890,
        items: 2,
        payment: "COD",
        status: "pending", // pending | confirmed | shipped | delivered | cancelled
        address: "Dhanmondi, Dhaka",
      },
      {
        _id: "o2",
        orderId: "NIY-10022",
        createdAt: "Tue, 17 Feb 2026 12:44:00 GMT",
        customer: { name: "Tarek Tia", email: "tarek@gmail.com", phone: "017XXXXXXXX" },
        total: 2890,
        items: 1,
        payment: "COD",
        status: "confirmed",
        address: "Mirpur, Dhaka",
      },
      {
        _id: "o3",
        orderId: "NIY-10023",
        createdAt: "Mon, 16 Feb 2026 17:37:48 GMT",
        customer: { name: "Blocked User", email: "blocked@gmail.com", phone: null },
        total: 1990,
        items: 1,
        payment: "COD",
        status: "delivered",
        address: "Uttara, Dhaka",
      },
      {
        _id: "o4",
        orderId: "NIY-10024",
        createdAt: "Mon, 16 Feb 2026 18:10:12 GMT",
        customer: { name: "Rafi Hasan", email: "rafi@gmail.com", phone: "018XXXXXXXX" },
        total: 3190,
        items: 1,
        payment: "COD",
        status: "cancelled",
        address: "Banani, Dhaka",
      },
    ],
    []
  );

  // UI-only filters
  const [tab, setTab] = useState("all"); // all | pending | confirmed | shipped | delivered | cancelled
  const [q, setQ] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const filtered = useMemo(() => {
    let list = [...orders];

    if (tab !== "all") list = list.filter((o) => o.status === tab);

    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (o) =>
          o.orderId.toLowerCase().includes(s) ||
          (o.customer?.name || "").toLowerCase().includes(s) ||
          (o.customer?.email || "").toLowerCase().includes(s)
      );
    }

    return list;
  }, [orders, tab, q]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      // UI-only (silent)
    }
  };

  const counts = useMemo(() => {
    const map = { all: orders.length };
    ["pending", "confirmed", "shipped", "delivered", "cancelled"].forEach((s) => {
      map[s] = orders.filter((o) => o.status === s).length;
    });
    return map;
  }, [orders]);

  return (
    <div className="bg-white">
      <div className="border border-neutral-200 rounded-md p-6 bg-white">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg tracking-wide text-neutral-800">Manage Orders</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Review orders and update their status.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-96">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <FiSearch />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="text"
              placeholder="Search by Order ID, name, email..."
              className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <TabButton active={tab === "all"} onClick={() => setTab("all")}>
            All <CountPill>{counts.all}</CountPill>
          </TabButton>
          <TabButton active={tab === "pending"} onClick={() => setTab("pending")}>
            Pending <CountPill>{counts.pending}</CountPill>
          </TabButton>
          <TabButton active={tab === "confirmed"} onClick={() => setTab("confirmed")}>
            Confirmed <CountPill>{counts.confirmed}</CountPill>
          </TabButton>
          <TabButton active={tab === "shipped"} onClick={() => setTab("shipped")}>
            Shipped <CountPill>{counts.shipped}</CountPill>
          </TabButton>
          <TabButton active={tab === "delivered"} onClick={() => setTab("delivered")}>
            Delivered <CountPill>{counts.delivered}</CountPill>
          </TabButton>
          <TabButton active={tab === "cancelled"} onClick={() => setTab("cancelled")}>
            Cancelled <CountPill>{counts.cancelled}</CountPill>
          </TabButton>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto border border-neutral-200 rounded-md">
          <table className="table w-full">
            <thead className="bg-neutral-50">
              <tr className="text-xs tracking-[0.2em] text-neutral-500">
                <th className="font-medium">ORDER</th>
                <th className="font-medium hidden md:table-cell">CUSTOMER</th>
                <th className="font-medium">TOTAL</th>
                <th className="font-medium hidden lg:table-cell">PAYMENT</th>
                <th className="font-medium">STATUS</th>
                <th className="font-medium text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr key={o._id} className="hover:bg-neutral-50">
                  {/* ORDER */}
                  <td>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-neutral-800 font-medium truncate">
                          {o.orderId}
                        </p>

                        {/* Copy order id */}
                        <button
                          type="button"
                          onClick={() => handleCopy(o.orderId)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                          title="Copy Order ID"
                          aria-label="Copy Order ID"
                        >
                          {copiedId === o.orderId ? (
                            <FiCheck className="text-[14px]" />
                          ) : (
                            <FiCopy className="text-[14px]" />
                          )}
                        </button>

                        {copiedId === o.orderId && (
                          <span className="text-[11px] text-[#B08A3C]">Copied!</span>
                        )}
                      </div>

                      <p className="text-[12px] text-neutral-500 mt-0.5 truncate">
                        {formatDate(o.createdAt)} • {o.items} item{o.items > 1 ? "s" : ""}
                      </p>

                      <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                        {o.address}
                      </p>
                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td className="hidden md:table-cell">
                    <div className="min-w-0">
                      <p className="text-sm text-neutral-800 font-medium truncate">
                        {o.customer?.name || "—"}
                      </p>
                      <p className="text-[12px] text-neutral-500 truncate">
                        {o.customer?.email || "—"}
                      </p>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {o.customer?.phone || "—"}
                      </p>
                    </div>
                  </td>

                  {/* TOTAL */}
                  <td>
                    <p className="text-sm text-neutral-800 font-medium">৳ {o.total}</p>
                    <p className="text-[12px] text-neutral-500">COD</p>
                  </td>

                  {/* PAYMENT */}
                  <td className="hidden lg:table-cell">
                    <span className="text-xs px-3 py-1 rounded-full border tracking-wide border-neutral-200 text-neutral-700">
                      {o.payment}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <OrderStatusBadge status={o.status} />
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      {/* View */}
                      <button
                        type="button"
                        className="px-3 py-2 text-xs rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition inline-flex items-center gap-2"
                        title="View details (UI)"
                      >
                        <FiEye /> View
                      </button>

                      {/* Change status dropdown (UI only) */}
                      <div className="dropdown dropdown-end">
                        <button
                          type="button"
                          className="px-3 py-2 text-xs rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center gap-2"
                          title="Change status (UI)"
                        >
                          Status
                          <FiChevronDown />
                        </button>

                        <ul className="dropdown-content z-50 mt-2 w-48 menu bg-white border border-neutral-200 shadow-md rounded-md p-2">
                          <li>
                            <button className="text-sm text-neutral-700 hover:text-[#B08A3C] inline-flex items-center gap-2">
                              <FiClock /> Pending
                            </button>
                          </li>
                          <li>
                            <button className="text-sm text-neutral-700 hover:text-[#B08A3C] inline-flex items-center gap-2">
                              <FiCheckCircle /> Confirmed
                            </button>
                          </li>
                          <li>
                            <button className="text-sm text-neutral-700 hover:text-[#B08A3C] inline-flex items-center gap-2">
                              <FiTruck /> Shipped
                            </button>
                          </li>
                          <li>
                            <button className="text-sm text-neutral-700 hover:text-[#B08A3C] inline-flex items-center gap-2">
                              <FiCheckCircle /> Delivered
                            </button>
                          </li>
                          <li>
                            <button className="text-sm text-red-500 hover:text-red-600 inline-flex items-center gap-2">
                              <FiXCircle /> Cancelled
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
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer hint */}
        <p className="mt-4 text-xs text-neutral-400">
          Tip: Confirm orders quickly to reduce cancellation and improve delivery flow.
        </p>
      </div>
    </div>
  );
};

export default ManageOrders;

/* ---------- UI pieces ---------- */

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-md border transition-colors inline-flex items-center gap-2
      ${
        active
          ? "border-[#B08A3C] text-[#B08A3C]"
          : "border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C]"
      }
    `}
  >
    {children}
  </button>
);

const CountPill = ({ children }) => (
  <span className="text-[11px] px-2 py-0.5 rounded-full border border-neutral-200 text-neutral-500">
    {children}
  </span>
);

const OrderStatusBadge = ({ status }) => {
  const map = {
    pending: {
      cls: "border-neutral-200 text-neutral-700",
      label: "pending",
    },
    confirmed: {
      cls: "border-[#B08A3C]/30 text-[#B08A3C]",
      label: "confirmed",
    },
    shipped: {
      cls: "border-[#B08A3C]/30 text-[#B08A3C]",
      label: "shipped",
    },
    delivered: {
      cls: "border-[#B08A3C]/30 text-[#B08A3C]",
      label: "delivered",
    },
    cancelled: {
      cls: "border-red-200 text-red-500",
      label: "cancelled",
    },
  };

  const cfg = map[status] || map.pending;

  return (
    <span className={`text-xs px-3 py-1 rounded-full border tracking-wide ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
};

const formatDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" });
};
