import { useMemo, useState } from "react";
import { FiStar, FiEdit2, FiTrash2, FiPackage, FiSearch } from "react-icons/fi";

const MyReviews = () => {
  // UI-only dummy data (replace later)
  const reviews = useMemo(
    () => [
      {
        _id: "r1",
        product: {
          name: "Classic White Panjabi",
          image:
            "https://images.unsplash.com/photo-1520975958225-f6be86f20f63?auto=format&fit=crop&w=400&q=60",
        },
        rating: 5,
        comment: "Quality is excellent, fitting is perfect. Loved it!",
        createdAt: "Tue, 17 Feb 2026 10:21:00 GMT",
        status: "published", // published | pending
      },
      {
        _id: "r2",
        product: {
          name: "Premium Cotton Shirt",
          image:
            "https://images.unsplash.com/photo-1520975911189-07f9b4d0d8e6?auto=format&fit=crop&w=400&q=60",
        },
        rating: 4,
        comment: "Fabric is good. Delivery was a bit late but satisfied overall.",
        createdAt: "Mon, 16 Feb 2026 18:10:12 GMT",
        status: "pending",
      },
      {
        _id: "r3",
        product: {
          name: "Olive Heritage Panjabi",
          image:
            "https://images.unsplash.com/photo-1520975693411-8f8a7f23e6b6?auto=format&fit=crop&w=400&q=60",
        },
        rating: 3,
        comment: "Nice color but I expected slightly thicker fabric.",
        createdAt: "Mon, 16 Feb 2026 17:37:48 GMT",
        status: "published",
      },
    ],
    []
  );

  const [tab, setTab] = useState("all"); // all | published | pending
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = [...reviews];

    if (tab === "published") list = list.filter((r) => r.status === "published");
    if (tab === "pending") list = list.filter((r) => r.status === "pending");

    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (r) =>
          r.product?.name?.toLowerCase().includes(s) ||
          (r.comment || "").toLowerCase().includes(s)
      );
    }

    return list;
  }, [reviews, tab, q]);

  return (
    <div className="bg-white">
      <div className="border border-neutral-200 rounded-md p-6 bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg tracking-wide text-neutral-800">My Reviews</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Manage your product reviews and ratings.
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
              placeholder="Search reviews..."
              className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition"
            />
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
          <TabButton active={tab === "pending"} onClick={() => setTab("pending")}>
            Pending
          </TabButton>
        </div>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Review List */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.map((r) => (
              <div
                key={r._id}
                className="rounded-md border border-neutral-200 p-4 sm:p-5 bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Product image */}
                    <div className="w-14 h-14 rounded-md border border-[#B08A3C]/40 overflow-hidden bg-[#B08A3C]/10 flex items-center justify-center">
                      {r.product?.image ? (
                        <img
                          src={r.product.image}
                          alt={r.product?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiPackage className="text-[#B08A3C]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-neutral-800 font-medium truncate">
                        {r.product?.name || "Product"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Stars rating={r.rating} />
                        <span className="text-xs text-neutral-500">
                          {r.rating}/5
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">
                        {formatDate(r.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={r.status} />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="w-10 h-10 rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                        title="Edit (UI)"
                        aria-label="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        type="button"
                        className="w-10 h-10 rounded-md border border-red-200 text-red-500 hover:border-red-300 transition inline-flex items-center justify-center"
                        title="Delete (UI)"
                        aria-label="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="mt-4 text-sm text-neutral-700 leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}

            {!filtered.length && (
              <div className="rounded-md border border-neutral-200 p-10 text-center text-sm text-neutral-500">
                No reviews found.
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="border border-neutral-200 rounded-md p-4 sm:p-5 bg-white h-fit">
            <p className="text-sm tracking-wide text-neutral-800 font-medium">
              Review Tips
            </p>

            <div className="mt-4 space-y-3">
              <InfoCard
                title="Be specific"
                desc="Mention fabric, fit, comfort and delivery experience."
              />
              <InfoCard
                title="Honest rating"
                desc="Your rating helps other customers make decisions."
              />
              <InfoCard
                title="Pending reviews"
                desc="Some reviews may be pending for approval."
              />
            </div>

            <p className="mt-5 text-xs text-neutral-400">
              Tip: Edit reviews if you receive a replacement or updated product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;

/* ---------- UI pieces ---------- */

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-md border transition-colors
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

const Stars = ({ rating = 0 }) => {
  const r = Math.max(0, Math.min(5, rating));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < r;
        return (
          <FiStar
            key={i}
            className={`text-sm ${filled ? "text-[#B08A3C]" : "text-neutral-300"}`}
          />
        );
      })}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const isPending = status === "pending";
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border tracking-wide
        ${
          isPending
            ? "border-neutral-200 text-neutral-700"
            : "border-[#B08A3C]/30 text-[#B08A3C]"
        }
      `}
    >
      {status || "published"}
    </span>
  );
};

const InfoCard = ({ title, desc }) => (
  <div className="rounded-md border border-neutral-200 p-3">
    <p className="text-sm text-neutral-800 font-medium">{title}</p>
    <p className="text-xs text-neutral-500 mt-1">{desc}</p>
  </div>
);

const formatDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
