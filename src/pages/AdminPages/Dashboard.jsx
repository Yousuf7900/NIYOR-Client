import { useMemo } from "react";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import useProducts from "../../hooks/useProducts";

const Dashboard = () => {
  const [products] = useProducts();
  const stats = products;

  const recentOrders = useMemo(
    () => [
      { id: "NIY-10021", customer: "Aliza Khan", total: 5890, status: "pending" },
      { id: "NIY-10022", customer: "Tarek Tia", total: 2890, status: "confirmed" },
      { id: "NIY-10023", customer: "Rafi Hasan", total: 1990, status: "delivered" },
    ],
    []
  );

  const lowStock = useMemo(
    () => [
      { name: "Classic White Panjabi", stock: 3 },
      { name: "Premium Cotton Shirt", stock: 2 },
    ],
    []
  );

  return (
    <div className="bg-white">
      <div className="border border-neutral-200 rounded-md p-6 bg-white">
        {/* Header */}
        <div>
          <h2 className="text-lg tracking-wide text-neutral-800">Dashboard</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Overview of your store performance.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={`৳ ${stats.revenue}`}
            icon={<FiDollarSign />}
          />
          <StatCard
            title="Total Orders"
            value={stats.price}
            icon={<FiShoppingBag />}
          />
          <StatCard
            title="Customers"
            value={stats.customers}
            icon={<FiUsers />}
          />
          <StatCard
            title="Products"
            value={stats.length}
            icon={<FiPackage />}
          />
        </div>

        {/* Middle Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 border border-neutral-200 rounded-md p-4 sm:p-5 bg-white">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full border border-[#B08A3C]/40 bg-[#B08A3C]/10 text-[#B08A3C] flex items-center justify-center">
                <FiTrendingUp />
              </span>
              <h3 className="text-sm tracking-wide text-neutral-800 font-medium">
                Recent Orders
              </h3>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-xs tracking-[0.2em] text-neutral-500">
                    <th className="font-medium">ORDER</th>
                    <th className="font-medium">CUSTOMER</th>
                    <th className="font-medium">TOTAL</th>
                    <th className="font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-neutral-50">
                      <td className="text-sm text-neutral-800 font-medium">
                        {o.id}
                      </td>
                      <td className="text-sm text-neutral-600">
                        {o.customer}
                      </td>
                      <td className="text-sm text-neutral-800">
                        ৳ {o.total}
                      </td>
                      <td>
                        <StatusBadge status={o.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-neutral-400">
              Showing latest 3 orders (UI only).
            </p>
          </div>

          {/* Low Stock */}
          <div className="border border-neutral-200 rounded-md p-4 sm:p-5 bg-white">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center">
                <FiAlertCircle />
              </span>
              <h3 className="text-sm tracking-wide text-neutral-800 font-medium">
                Low Stock Alerts
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              {lowStock.map((p, i) => (
                <div
                  key={i}
                  className="rounded-md border border-neutral-200 p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-neutral-800 font-medium truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Only {p.stock} left
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-500">
                    Low
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-neutral-400">
              Restock products before they go out of stock.
            </p>
          </div>
        </div>

        {/* Footer Tip */}
        <p className="mt-8 text-xs text-neutral-400">
          Tip: Monitor revenue and low stock daily to maintain steady growth.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------- Components ---------- */

const StatCard = ({ title, value, icon }) => (
  <div className="border border-neutral-200 rounded-md p-4 bg-white flex items-center gap-4">
    <div className="w-12 h-12 rounded-full border border-[#B08A3C]/40 bg-[#B08A3C]/10 text-[#B08A3C] flex items-center justify-center text-lg">
      {icon}
    </div>
    <div>
      <p className="text-xs tracking-wide text-neutral-500 uppercase">
        {title}
      </p>
      <p className="text-lg font-semibold text-neutral-800 mt-1">
        {value}
      </p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    pending: "border-neutral-200 text-neutral-700",
    confirmed: "border-[#B08A3C]/30 text-[#B08A3C]",
    delivered: "border-[#B08A3C]/30 text-[#B08A3C]",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border tracking-wide ${map[status] || "border-neutral-200 text-neutral-700"
        }`}
    >
      {status}
    </span>
  );
};
