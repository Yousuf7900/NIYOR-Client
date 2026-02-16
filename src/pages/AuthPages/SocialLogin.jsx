import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import Loading from "../../components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const handleGoogleSignIn = async () => {
        try {
            setPageLoading(true);
            const res = await googleSignIn();
            console.log(res.user);
            const useData = {
                name: res.user.displayName,
                uid: res.user.uid,
                email: res.user.email,
                phone: res.user.phoneNumber || null,
                photoURL: res.user.photoURL || null,
                createdAt: res.user.metadata.creationTime,
                lastLoginAt: res.user.metadata.lastSignInTime
            };
            const dbRes = await axiosPublic.patch('/api/users', useData);
            console.log(dbRes.data);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        } finally {
            setPageLoading(false);
        }
    }
    if (pageLoading) {
        return <Loading text={"Authenticating with Google..."} />
    }

    return (
        <div className="mt-8">

            {/* Social Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">

                {/* Google */}
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white hover:border-[#B08A3C] hover:shadow-sm transition-all duration-300"
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                {/* Facebook */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white hover:border-[#B08A3C] hover:shadow-sm transition-all duration-300"
                >
                    <FaFacebookF size={16} className="text-[#1877F2]" />
                    Continue with Facebook
                </button>

            </div>
        </div>
    );
};

export default SocialLogin;
