import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useLogout = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

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

        if (!result.isConfirmed) return;

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
    };

    return handleLogout;
};

export default useLogout;
