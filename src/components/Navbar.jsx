import { FiShoppingBag, FiUser, FiGrid, FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();  //temp check remove later
    const userName = user?.displayName || "Account";

    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    const mainLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const linkClass = ({ isActive }) =>
        `py-2 text-[15px] font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-[#B08A3C]" : "text-neutral-500 hover:text-[#B08A3C]"
        }`;

    return (
        <div className="navbar bg-white border-b border-neutral-200 px-4 lg:px-10 relative">
            {/* LEFT */}
            <div className="navbar-start flex items-center gap-3">
                {/* Mobile: Profile on LEFT */}
                <div className="lg:hidden">
                    <div className="dropdown dropdown-start">
                        <div className="tooltip tooltip-bottom" data-tip={user ? userName : "Account"}>
                            {
                                user?.photoURL ? (
                                    <div tabIndex={0} role="button" aria-label="Account Menu">
                                        <img
                                            src={user.photoURL}
                                            referrerPolicy="no-referrer"
                                            alt="User avatar"
                                            className="w-10 h-10 rounded-full object-cover border border-[#B08A3C]/40"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        tabIndex={1}
                                        role="button"
                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition-colors duration-300 bg-white"
                                        aria-label="Account Menu"
                                    >
                                        <FiUser size={18} />
                                    </div>
                                )
                            }
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-50 mt-3 w-56 menu bg-white border border-neutral-200 shadow-md rounded-md p-2"
                        >
                            {user ? (
                                <>
                                    <li className="pointer-events-none">
                                        <span className="text-[11px] tracking-[0.2em] text-neutral-500">
                                            ACCOUNT
                                        </span>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/dashboard/my-profile"
                                            className="flex items-center gap-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            <FiUser /> Profile
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            className="flex items-center gap-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            <FiGrid /> Dashboard
                                        </NavLink>
                                    </li>

                                    <div className="my-1 h-px bg-neutral-200" />

                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            <FiLogOut /> Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="pointer-events-none">
                                        <span className="text-[11px] tracking-[0.2em] text-neutral-500">
                                            ACCOUNT
                                        </span>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            Login
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/register"
                                            className="text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Logo: center on mobile, left on desktop */}
                <a
                    className="
            text-xl font-semibold tracking-[0.18em] text-[#B08A3C]
            absolute left-1/2 -translate-x-1/2
            lg:static lg:translate-x-0"
                >
                    NIYOR | নিওর
                </a>
            </div>

            {/* CENTER (Desktop menu) */}
            <div className="navbar-center hidden lg:flex flex-1 justify-center">
                <ul className="flex items-center gap-10">
                    {mainLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink to={link.path} className={linkClass}>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end flex items-center gap-4">
                {/* Mobile: Hamburger RIGHT */}
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost px-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-4 w-60 p-6 bg-white border border-neutral-200 shadow-md rounded-md space-y-2 z-50"
                    >
                        {mainLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink to={link.path} className={linkClass}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}

                        <div className="my-2 h-px bg-neutral-200" />

                        <li>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    `py-2 text-[15px] font-medium tracking-wide transition-colors duration-300 ${isActive
                                        ? "text-[#B08A3C]"
                                        : "text-neutral-500 hover:text-[#B08A3C]"
                                    }`
                                }
                            >
                                Cart
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Desktop */}
                <div className="hidden lg:block">
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `px-0 py-2 text-[18px] transition-colors duration-300 ${isActive
                                ? "text-[#B08A3C]"
                                : "text-neutral-500 hover:text-[#B08A3C]"
                            }`
                        }
                        aria-label="Cart"
                    >
                        <FiShoppingBag />
                    </NavLink>
                </div>

                {/* Desktop */}
                <div className="hidden lg:block">
                    <div className="dropdown dropdown-end">
                        <div className="tooltip tooltip-bottom" data-tip={user ? userName : "Account"}>
                            {
                                user?.photoURL ? (
                                    <div tabIndex={0} role="button" aria-label="Account Menu">
                                        <img
                                            src={user.photoURL}
                                            alt="User avatar"
                                            referrerPolicy="no-referrer"
                                            className="w-10 h-10 rounded-full object-cover border border-[#B08A3C]/40"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition-colors duration-300 bg-white"
                                        aria-label="Account Menu"
                                    >
                                        <FiUser size={18} />
                                    </div>
                                )
                            }
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-50 mt-3 w-56 menu bg-white border border-neutral-200 shadow-md rounded-md p-2"
                        >
                            {user ? (
                                <>
                                    <li className="pointer-events-none">
                                        <span className="text-[11px] tracking-[0.2em] text-neutral-500">
                                            ACCOUNT
                                        </span>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/dashboard/my-profile"
                                            className="flex items-center gap-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            <FiUser /> Profile
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            className="flex items-center gap-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            <FiGrid /> Dashboard
                                        </NavLink>
                                    </li>

                                    <div className="my-1 h-px bg-neutral-200" />

                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            <FiLogOut /> Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="pointer-events-none">
                                        <span className="text-[11px] tracking-[0.2em] text-neutral-500">
                                            ACCOUNT
                                        </span>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            Login
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/register"
                                            className="text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#B08A3C]"
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
