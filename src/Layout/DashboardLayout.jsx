import { Outlet, NavLink } from "react-router";
import {
    FiHome,
    FiShoppingBag,
    FiLogOut,
    FiUser,
    FiSettings,
    FiGrid,
    FiPackage,
    FiUsers,
    FiShoppingCart,
    FiStar,
    FiMenu
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useUserData from "../hooks/useUserData";
import Loading from "../components/Loading";
import useLogout from "../hooks/useLogOut";

const DashboardLayout = () => {
    const { user } = useAuth();
    const { userData, loading } = useUserData();

    const role = userData.role;

    const userName = user?.displayName || "Guest User";
    const userEmail = user?.email || "guest@email.com";
    const userPhoto = user?.photoURL || null;

    const linkBase =
        "flex items-center gap-3 text-sm rounded-md px-3 py-2 transition-colors";
    const linkClass = ({ isActive }) =>
        `${linkBase} ${isActive ? "text-[#B08A3C] bg-white" : "text-neutral-600 hover:text-[#B08A3C]"
        }`;

    const handleLogout = useLogout();


    const commonLinks = [
        { label: "Home", to: "/", icon: <FiHome size={16} /> },
        { label: "Shop", to: "/shop", icon: <FiShoppingBag size={16} /> },
        { label: "My Profile", to: "/dashboard/my-profile", icon: <FiUser size={16} /> },
    ];

    // ✅ Customer links
    const customerLinks = [
        { label: "My Orders", to: "/dashboard/my-orders", icon: <FiShoppingCart size={16} /> },
        { label: "My Reviews", to: "/dashboard/my-reviews", icon: <FiStar size={16} /> },
        { label: "Settings", to: "/dashboard/settings", icon: <FiSettings size={16} /> },
    ];

    // ✅ Admin links
    const adminLinks = [
        { label: "Dashboard", to: "/dashboard/admin-home", icon: <FiGrid size={16} /> },
        { label: "Manage Products", to: "/dashboard/manage-products", icon: <FiPackage size={16} /> },
        { label: "ADD Products", to: "/dashboard/add-products", icon: <FiPackage size={16} /> },
        { label: "Manage Orders", to: "/dashboard/manage-orders", icon: <FiShoppingCart size={16} /> },
        { label: "Manage Users", to: "/dashboard/manage-users", icon: <FiUsers size={16} /> },
        { label: "Settings", to: "/dashboard/settings", icon: <FiSettings size={16} /> },
    ];

    const roleLinks = role === "admin" ? adminLinks : customerLinks;

    if (loading) {
        return (
            <Loading text={"Loading your dashboard..."} />
        );
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* CONTENT */}
            <div className="drawer-content">
                {/* Topbar */}
                <nav className="navbar w-full bg-white border-b border-neutral-200 px-4">
                    <label
                        htmlFor="dashboard-drawer"
                        aria-label="open sidebar"
                        className="btn btn-ghost btn-square lg:hidden"
                    >
                        <FiMenu size={18} />
                    </label>

                    <div className="flex-1">
                        <p className="text-sm tracking-[0.25em] text-[#B08A3C] font-medium">
                            DASHBOARD
                        </p>
                    </div>
                </nav>

                {/* Page content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay" />

                <aside className="min-h-full w-72 bg-white border-r border-neutral-200 p-4">
                    {/* Brand */}
                    <div className="mb-6">
                        <p className="text-sm tracking-[0.35em] text-[#B08A3C]">
                            NIYOR | নিওর
                        </p>
                        <p className="mt-2 text-xs tracking-[0.25em] text-neutral-400">
                            {role === "admin" ? "ADMIN PANEL" : "CUSTOMER PANEL"}
                        </p>
                    </div>

                    {/* Profile (always shown) */}
                    <div className="mb-6 flex items-center gap-3 border border-neutral-200 rounded-md p-3">
                        {userPhoto ? (
                            <img
                                src={userPhoto}
                                alt="User"
                                className="w-11 h-11 rounded-full object-cover border border-[#B08A3C]/40"
                            />
                        ) : (
                            <div className="w-11 h-11 rounded-full border border-[#B08A3C]/40 flex items-center justify-center text-[#B08A3C] bg-white">
                                <FiUser size={18} />
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="text-sm text-neutral-800 truncate">{userName}</p>
                            <p className="text-[11px] text-neutral-400 truncate">{userEmail}</p>
                        </div>
                    </div>

                    {/* Menu */}
                    <ul className="menu p-0 space-y-1">
                        {/* Common */}
                        <li className="pointer-events-none px-3 py-2">
                            <span className="text-[11px] tracking-[0.2em] text-neutral-400">
                                COMMON
                            </span>
                        </li>

                        {commonLinks.map((l) => (
                            <li key={l.to}>
                                <NavLink to={l.to} className={linkClass}>
                                    {l.icon}
                                    <span>{l.label}</span>
                                </NavLink>
                            </li>
                        ))}

                        <div className="my-3 h-px bg-neutral-200" />

                        {/* Role-based */}
                        <li className="pointer-events-none px-3 py-2">
                            <span className="text-[11px] tracking-[0.2em] text-neutral-400">
                                {role === "admin" ? "ADMIN" : "CUSTOMER"}
                            </span>
                        </li>

                        {roleLinks.map((l) => (
                            <li key={l.to}>
                                <NavLink to={l.to} className={linkClass}>
                                    {l.icon}
                                    <span>{l.label}</span>
                                </NavLink>
                            </li>
                        ))}

                        <div className="my-3 h-px bg-neutral-200" />

                        {/* Logout */}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 text-sm rounded-md px-3 py-2 text-neutral-600 hover:text-[#B08A3C] transition-colors"
                            >
                                <FiLogOut size={16} />
                                Logout
                            </button>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
