import { useMemo } from "react";
import {
  FiArrowLeft,
  FiCopy,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiPackage,
  FiX,
} from "react-icons/fi";

const OrderDetails = () => {
  // UI-only dummy order (replace later)
  const order = useMemo(
    () => ({
      orderId: "NIY-10022",
      createdAt: "Tue, 17 Feb 2026 12:44:00 GMT",
      status: "shipped", // pending | confirmed | shipped | delivered | cancelled
      payment: "COD",
      total: 2890,
      subtotal: 2690,
      delivery: 200,
      customer: {
        name: "Tarek Tia",
        email: "tarek@gmail.com",
        phone: "017XXXXXXXX",
      },
      address: "Mirpur, Dhaka",
      items: [
        {
          _id: "i1",
          name: "Classic White Panjabi",
          qty: 1,
          price: 2690,
          size: "L",
          color: "White",
          image:
            "https://images.unsplash.com/photo-1520975958225-f6be86f20f63?auto=format&fit=crop&w=400&q=60",
        },
      ],
    }),
    []
  );

  return (
    <div className="bg-white">
      <div className="border border-neutral-200 rounded-md p-6 bg-white">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                title="Back"
                aria-label="Back"
              >
                <FiArrowLeft />
              </button>

              <div>
                <h2 className="text-lg tracking-wide text-neutral-800">
                  Order Details
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Track your order and manage actions.
                </p>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
            >
              Copy Invoice
              <FiCopy className="inline ml-2" />
            </button>

            {/* Cancel button */}
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-md border border-red-200 text-red-500 hover:border-red-300 transition inline-flex items-center justify-center gap-2"
              title="Cancel order (UI only)"
            >
              <FiXCircle />
              Cancel Order
            </button>
          </div>
        </div>

        {/* Top summary */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order summary */}
          <div className="lg:col-span-2 border border-neutral-200 rounded-md p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral-500">Order ID</p>
                  <span className="text-sm text-neutral-800 font-medium">
                    {order.orderId}
                  </span>

                  <button
                    type="button"
                    className="w-9 h-9 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                    title="Copy order id"
                    aria-label="Copy order id"
                  >
                    <FiCopy />
                  </button>
                </div>

                <p className="text-xs text-neutral-400 mt-1">
                  Placed on {formatDate(order.createdAt)} • Payment: {order.payment}
                </p>
              </div>

              <OrderStatusBadge status={order.status} />
            </div>

            {/* Items */}
            <div className="mt-5 border-t border-neutral-200 pt-4 space-y-3">
              {order.items.map((it) => (
                <div
                  key={it._id}
                  className="rounded-md border border-neutral-200 p-3 flex items-start gap-3"
                >
                  <div className="w-16 h-16 rounded-md border border-[#B08A3C]/40 overflow-hidden bg-[#B08A3C]/10 flex items-center justify-center">
                    {it.image ? (
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiPackage className="text-[#B08A3C]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-800 font-medium truncate">
                      {it.name}
                    </p>

                    <p className="text-xs text-neutral-500 mt-1">
                      Qty: {it.qty} • Size: {it.size || "—"} • Color:{" "}
                      {it.color || "—"}
                    </p>

                    <p className="text-sm text-neutral-800 font-medium mt-2">
                      ৳ {it.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer + Address */}
          <div className="border border-neutral-200 rounded-md p-4 sm:p-5">
            <p className="text-sm tracking-wide text-neutral-800 font-medium">
              Delivery Info
            </p>

            <div className="mt-4 space-y-3">
              <InfoRow icon={<FiMapPin />} label="Address" value={order.address} />
              <InfoRow icon={<FiUserIcon />} label="Name" value={order.customer.name} />
              <InfoRow icon={<FiMail />} label="Email" value={order.customer.email} />
              <InfoRow icon={<FiPhone />} label="Phone" value={order.customer.phone} />
            </div>

            <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 leading-relaxed">
                Tip: You can cancel only before it’s delivered. If already shipped, contact support.
              </p>
            </div>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="mt-6 border border-neutral-200 rounded-md p-4 sm:p-5">
          <p className="text-sm tracking-wide text-neutral-800 font-medium">
            Payment Summary
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SummaryRow label="Subtotal" value={`৳ ${order.subtotal}`} />
            <SummaryRow label="Delivery" value={`৳ ${order.delivery}`} />
            <SummaryRow label="Total" value={`৳ ${order.total}`} strong />
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-4 text-xs text-neutral-400">
          Tip: Save your Order ID for faster support.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;

/* ---------- UI pieces ---------- */

const InfoRow = ({ icon, label, value }) => (
  <div className="rounded-md border border-neutral-200 p-3 flex items-start gap-3">
    <span className="w-9 h-9 rounded-full border border-[#B08A3C]/40 bg-[#B08A3C]/10 text-[#B08A3C] flex items-center justify-center">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-xs tracking-wide text-neutral-500 uppercase">{label}</p>
      <p className="text-sm text-neutral-800 font-medium truncate">{value || "—"}</p>
    </div>
  </div>
);

const SummaryRow = ({ label, value, strong }) => (
  <div className="rounded-md border border-neutral-200 p-4 flex items-center justify-between">
    <p className="text-sm text-neutral-600">{label}</p>
    <p className={`text-sm ${strong ? "text-neutral-800 font-semibold" : "text-neutral-800"}`}>
      {value}
    </p>
  </div>
);

const OrderStatusBadge = ({ status }) => {
  const map = {
    pending: { cls: "border-neutral-200 text-neutral-700", icon: <FiClock /> },
    confirmed: { cls: "border-[#B08A3C]/30 text-[#B08A3C]", icon: <FiCheckCircle /> },
    shipped: { cls: "border-[#B08A3C]/30 text-[#B08A3C]", icon: <FiTruck /> },
    delivered: { cls: "border-[#B08A3C]/30 text-[#B08A3C]", icon: <FiCheckCircle /> },
    cancelled: { cls: "border-red-200 text-red-500", icon: <FiX /> },
  };

  const cfg = map[status] || map.pending;

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border tracking-wide inline-flex items-center gap-2 ${cfg.cls}`}
    >
      <span className="text-sm">{cfg.icon}</span>
      {status}
    </span>
  );
};

// small placeholder user icon (keeps no extra import)
const FiUserIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="text-[#B08A3C]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const formatDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" });
};
