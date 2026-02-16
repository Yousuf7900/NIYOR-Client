import {
    FiUser,
    FiEdit3,
    FiPackage,
    FiMapPin,
    FiHeart,
    FiShield,
    FiLogOut,
    FiGrid,
    FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router";

const MyProfile = () => {
    // Replace later with auth context
    const user = {
        name: "NIYOR User",
        email: "user@niyor.com",
        phone: "+880 18XXXXXXXX",
        address: "Cumilla, Bangladesh",
        role: "admin", // "admin"
        joined: "February 2026",
    };

    const stats = [
        { label: "Orders", value: 12 },
        { label: "Pending", value: 2 },
        { label: "Wishlist", value: 5 },
    ];

    const recentOrders = [
        { id: "NIY-1021", status: "Pending", total: 6180, date: "2 days ago" },
        { id: "NIY-1012", status: "Delivered", total: 2890, date: "1 week ago" },
    ];

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-14">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl tracking-[0.25em] text-neutral-800">
                        ACCOUNT
                    </h1>
                    <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-sm">
                        NIYOR | নিওর
                    </p>
                    <p className="mt-4 text-neutral-600 text-sm max-w-2xl">
                        Everything you need in one place — orders, address, wishlist and account settings.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="border border-neutral-200 rounded-md p-6 bg-white">

                            {/* Profile mini */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full border border-[#B08A3C]/40 flex items-center justify-center text-[#B08A3C] text-lg">
                                    {user.name?.slice(0, 1)}
                                </div>

                                <div className="min-w-0">
                                    <h2 className="text-neutral-800 tracking-wide truncate">
                                        {user.name}
                                    </h2>
                                    <p className="text-sm text-neutral-500 truncate">{user.email}</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-2 text-sm text-neutral-600">
                                <p>
                                    <span className="text-neutral-500">Phone:</span>{" "}
                                    <span className="text-neutral-700">{user.phone}</span>
                                </p>
                                <p>
                                    <span className="text-neutral-500">Member:</span>{" "}
                                    <span className="text-neutral-700">{user.joined}</span>
                                </p>
                            </div>

                            {/* Primary action */}
                            <button className="mt-6 w-full px-4 py-3 text-sm tracking-wide border border-[#B08A3C] text-[#B08A3C] hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md inline-flex items-center justify-center gap-2">
                                <FiEdit3 />
                                Edit Profile
                            </button>

                            {/* Divider */}
                            <div className="my-6 h-px bg-neutral-200" />

                            {/* Navigation (best UX) */}
                            <nav className="space-y-2">
                                <SideLink to="/profile" icon={<FiUser />} label="Profile Overview" />
                                <SideLink to="/orders" icon={<FiPackage />} label="My Orders" />
                                <SideLink to="/address" icon={<FiMapPin />} label="Address Book" />
                                <SideLink to="/wishlist" icon={<FiHeart />} label="Wishlist" />
                                <SideLink to="/security" icon={<FiShield />} label="Security" />

                                {user.role === "admin" && (
                                    <SideLink to="/dashboard" icon={<FiGrid />} label="Admin Dashboard" />
                                )}
                            </nav>

                            {/* Logout */}
                            <button className="mt-6 w-full px-4 py-3 text-sm tracking-wide border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-all duration-300 rounded-md inline-flex items-center justify-center gap-2">
                                <FiLogOut />
                                Logout
                            </button>
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="lg:col-span-8 space-y-8">

                        {/* Overview Card */}
                        <div className="border border-neutral-200 rounded-md p-8 bg-white">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h3 className="text-lg tracking-wide text-neutral-800">
                                        Profile Overview
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-600">
                                        Keep your phone and address updated for smooth COD delivery.
                                    </p>
                                </div>

                                <div className="text-sm text-neutral-600">
                                    <p className="text-neutral-500">Default Address</p>
                                    <p className="text-neutral-800">{user.address}</p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                {stats.map((s) => (
                                    <div
                                        key={s.label}
                                        className="border border-neutral-200 rounded-md p-5 text-center"
                                    >
                                        <p className="text-[11px] tracking-[0.25em] text-neutral-500">
                                            {s.label.toUpperCase()}
                                        </p>
                                        <p className="mt-3 text-2xl font-light text-neutral-800">
                                            {s.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick actions (buttons for easy access) */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <QuickAction
                                to="/orders"
                                title="Track Orders"
                                desc="Check status, delivery updates"
                                icon={<FiPackage />}
                            />
                            <QuickAction
                                to="/address"
                                title="Update Address"
                                desc="Change delivery details anytime"
                                icon={<FiMapPin />}
                            />
                        </div>

                        {/* Recent orders */}
                        <div className="border border-neutral-200 rounded-md p-8 bg-white">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg tracking-wide text-neutral-800">
                                    Recent Orders
                                </h3>
                                <Link
                                    to="/orders"
                                    className="text-sm text-[#B08A3C] hover:underline"
                                >
                                    View All
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recentOrders.map((o) => (
                                    <div
                                        key={o.id}
                                        className="flex items-center justify-between border border-neutral-200 rounded-md p-5 hover:border-[#B08A3C] transition-colors"
                                    >
                                        <div>
                                            <p className="text-sm tracking-wide text-neutral-800">
                                                {o.id}
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-1">
                                                {o.date} • ৳ {o.total.toLocaleString("en-BD")}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full border tracking-wide ${o.status === "Pending"
                                                    ? "border-neutral-300 text-neutral-600"
                                                    : "border-[#B08A3C]/40 text-[#B08A3C]"
                                                    }`}
                                            >
                                                {o.status}
                                            </span>

                                            <FiChevronRight className="text-neutral-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-6 text-sm text-neutral-500">
                                Tip: For COD orders, we may call to confirm before shipping.
                            </p>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

/* ---------- Small UI components ---------- */

const SideLink = ({ to, icon, label }) => (
    <Link
        to={to}
        className="flex items-center justify-between px-4 py-3 rounded-md border border-neutral-200 text-sm text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
    >
        <span className="flex items-center gap-3">
            <span className="text-[#B08A3C]">{icon}</span>
            {label}
        </span>
        <FiChevronRight className="text-neutral-300" />
    </Link>
);

const QuickAction = ({ to, title, desc, icon }) => (
    <Link
        to={to}
        className="border border-neutral-200 rounded-md p-6 hover:border-[#B08A3C] hover:shadow-sm transition-all duration-300 bg-white"
    >
        <div className="flex items-center gap-3 text-neutral-800">
            <span className="text-[#B08A3C] text-lg">{icon}</span>
            <h4 className="text-sm tracking-wide">{title}</h4>
        </div>
        <p className="mt-3 text-xs text-neutral-500">{desc}</p>
    </Link>
);
