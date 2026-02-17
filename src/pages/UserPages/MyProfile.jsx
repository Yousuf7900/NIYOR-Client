import { FiEdit3, FiLogOut, FiPackage, FiMapPin, FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import useUserData from "../../hooks/useUserData";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const { userData, loading } = useUserData();

    const userName = userData?.name || user?.displayName || "Customer";
    const userEmail = userData?.email || user?.email || "";
    const userPhoto = userData?.photoURL || user?.photoURL || null;

    const memberSince = userData?.createdAt
        ? new Date(userData.createdAt).toLocaleDateString("en-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "—";

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Logout?",
            text: "You will need to sign in again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#B08A3C",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout",
        });

        if (result.isConfirmed) {
            try {
                await logOut();

                await Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have been successfully logged out.",
                    timer: 1500,
                    showConfirmButton: false,
                });

                navigate("/");
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message,
                });
            }
        }
    };

    if (loading) {
        return (
            <Loading text={"Loading your account..."} />
        );
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-14">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl tracking-[0.25em] text-neutral-800">
                        MY ACCOUNT
                    </h1>
                    <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-sm">
                        NIYOR | নিওর
                    </p>
                    <p className="mt-4 text-neutral-600 text-sm max-w-2xl">
                        Manage your profile and keep delivery details updated for smooth COD orders.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left card */}
                    <aside className="lg:col-span-4">
                        <div className="border border-neutral-200 rounded-md p-6 bg-white">
                            {/* Profile mini */}
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-full border border-[#B08A3C]/40 overflow-hidden flex items-center justify-center bg-[#B08A3C]/10 text-[#B08A3C] font-medium text-lg">
                                    {userPhoto ? (
                                        <img
                                            src={userPhoto}
                                            alt={userName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span>{userName?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="min-w-0">
                                    <h2 className="text-neutral-800 tracking-wide font-medium truncate">
                                        {userName}
                                    </h2>
                                    <p className="text-sm text-neutral-500 truncate">{userEmail}</p>
                                </div>
                            </div>

                            {/* Info rows */}
                            <div className="mt-6 space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-500">Phone</span>
                                    <span className="text-neutral-800 font-medium">
                                        {userData?.phone || "Not provided"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-500">Member Since</span>
                                    <span className="text-neutral-800 font-medium">{memberSince}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 space-y-3">
                                <button className="w-full px-4 py-3 text-sm tracking-wide border border-[#B08A3C] text-[#B08A3C] hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md inline-flex items-center justify-center gap-2">
                                    <FiEdit3 />
                                    Edit Profile
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 text-sm tracking-wide border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-all duration-300 rounded-md inline-flex items-center justify-center gap-2"
                                >
                                    <FiLogOut />
                                    Logout
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="my-6 h-px bg-neutral-200" />

                            {/* Quick links (only essential) */}
                            <nav className="space-y-2">
                                <MiniLink to="/orders" icon={<FiPackage />} label="My Orders" />
                                <MiniLink to="/address" icon={<FiMapPin />} label="Address Book" />
                                <MiniLink to="/wishlist" icon={<FiHeart />} label="Wishlist" />
                            </nav>
                        </div>
                    </aside>

                    {/* Right side */}
                    <main className="lg:col-span-8 space-y-6">
                        {/* Delivery reminder */}
                        <div className="border border-neutral-200 rounded-md p-8 bg-white">
                            <h3 className="text-lg tracking-wide text-neutral-800">
                                Delivery Details
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600">
                                Add your phone and address to ensure fast COD delivery.
                            </p>

                            <div className="mt-6 grid sm:grid-cols-2 gap-4">
                                <Link
                                    to="/address"
                                    className="border border-neutral-200 rounded-md p-6 hover:border-[#B08A3C] hover:shadow-sm transition-all duration-300 bg-white"
                                >
                                    <div className="flex items-center gap-3 text-neutral-800">
                                        <span className="text-[#B08A3C] text-lg">
                                            <FiMapPin />
                                        </span>
                                        <h4 className="text-sm tracking-wide">Update Address</h4>
                                    </div>
                                    <p className="mt-3 text-xs text-neutral-500">
                                        Manage delivery location anytime
                                    </p>
                                </Link>

                                <Link
                                    to="/orders"
                                    className="border border-neutral-200 rounded-md p-6 hover:border-[#B08A3C] hover:shadow-sm transition-all duration-300 bg-white"
                                >
                                    <div className="flex items-center gap-3 text-neutral-800">
                                        <span className="text-[#B08A3C] text-lg">
                                            <FiPackage />
                                        </span>
                                        <h4 className="text-sm tracking-wide">Track Orders</h4>
                                    </div>
                                    <p className="mt-3 text-xs text-neutral-500">
                                        Check status and delivery updates
                                    </p>
                                </Link>
                            </div>

                            <p className="mt-6 text-sm text-neutral-500">
                                Tip: For COD orders, we may call to confirm before shipping.
                            </p>
                        </div>

                        {/* Simple info card (optional, but useful) */}
                        <div className="border border-neutral-200 rounded-md p-8 bg-white">
                            <h3 className="text-lg tracking-wide text-neutral-800">
                                Account Info
                            </h3>

                            <div className="mt-5 space-y-3 text-sm">
                                <Row label="Name" value={userName} />
                                <Row label="Email" value={userEmail} />
                                <Row label="Phone" value={userData?.phone || "Not provided"} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

/* ---------- Small UI components ---------- */

const MiniLink = ({ to, icon, label }) => (
    <Link
        to={to}
        className="flex items-center gap-3 px-4 py-3 rounded-md border border-neutral-200 text-sm text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
    >
        <span className="text-[#B08A3C]">{icon}</span>
        <span>{label}</span>
    </Link>
);

const Row = ({ label, value }) => (
    <div className="flex items-center justify-between gap-4">
        <span className="text-neutral-500">{label}</span>
        <span className="text-neutral-800 font-medium truncate">{value}</span>
    </div>
);
