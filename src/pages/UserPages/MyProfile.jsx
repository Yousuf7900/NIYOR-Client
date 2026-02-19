import { FiEdit3, FiLogOut, FiPackage, FiMail, FiPhone, FiCalendar, FiClock } from "react-icons/fi";
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

    const lastLogin = userData?.lastLoginAt
        ? new Date(userData.lastLoginAt).toLocaleDateString("en-BD", {
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
                    timer: 1400,
                    showConfirmButton: false,
                });

                navigate("/");
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message,
                    confirmButtonColor: "#B08A3C",
                });
            }
        }
    };

    if (loading) return <Loading text={"Loading your account..."} />;

    return (
        <div className="bg-white">
            <div className="max-w-3xl mx-auto px-4 py-14">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl tracking-[0.25em] text-neutral-800">
                        MY ACCOUNT
                    </h1>
                    <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-sm">
                        NIYOR | নিওর
                    </p>
                    <p className="mt-4 text-neutral-600 text-sm max-w-xl">
                        Update your profile details for smoother COD delivery.
                    </p>
                </div>

                {/* Main minimal card */}
                <div className="border border-neutral-200 rounded-md bg-white overflow-hidden">
                    {/* top soft section */}
                    <div className="bg-neutral-50 border-b border-neutral-200 p-8 text-center">
                        {/* Avatar */}
                        <div className="mx-auto w-28 h-28 rounded-full border border-[#B08A3C]/40 bg-white overflow-hidden flex items-center justify-center">
                            {userPhoto ? (
                                <img
                                    src={userPhoto}
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#B08A3C]/10 text-[#B08A3C] font-semibold text-3xl">
                                    {userName?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h2 className="mt-4 text-xl tracking-wide text-neutral-800 font-medium">
                            {userName}
                        </h2>

                        <div className="mt-2 inline-flex items-center gap-2 text-sm text-neutral-500">
                            <FiMail className="text-neutral-400" />
                            <span className="truncate max-w-[240px] sm:max-w-[420px]">{userEmail}</span>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to={`/dashboard/profile/edit`}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                            >
                                <FiEdit3 />
                                Edit Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                            >
                                <FiLogOut />
                                Logout
                            </button>
                        </div>

                        {/* Simple secondary link */}
                        <div className="mt-5">
                            <Link
                                to="/orders"
                                className="inline-flex items-center justify-center gap-2 text-sm text-neutral-600 hover:text-[#B08A3C] transition"
                            >
                                <FiPackage />
                                View My Orders
                            </Link>
                        </div>
                    </div>

                    {/* Info section */}
                    <div className="p-8">
                        <p className="text-xs tracking-[0.25em] text-neutral-500">
                            PROFILE INFO
                        </p>

                        <div className="mt-5 divide-y divide-neutral-200 border border-neutral-200 rounded-md overflow-hidden">
                            <InfoRow icon={<FiPhone />} label="Phone" value={userData?.phone || "Not provided"} />
                            <InfoRow icon={<FiCalendar />} label="Member Since" value={memberSince} />
                            <InfoRow icon={<FiClock />} label="Last Login" value={lastLogin} />
                        </div>

                        <p className="mt-5 text-xs text-neutral-400">
                            Tip: Keep your phone updated so we can confirm COD delivery quickly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

/* ---------- UI ---------- */

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center justify-between gap-4 px-5 py-4 bg-white">
        <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-md border border-neutral-200 bg-neutral-50 flex items-center justify-center text-[#B08A3C]">
                {icon}
            </span>
            <div className="min-w-0">
                <p className="text-sm text-neutral-700 font-medium">{label}</p>
                <p className="text-xs text-neutral-500 truncate">{value}</p>
            </div>
        </div>
    </div>
);
