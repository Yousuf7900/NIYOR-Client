import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiUploadCloud, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/useUserData";
import Loading from "../../components/Loading";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";


const FALLBACK_IMG = "https://i.ibb.co/9y0JmZQ/placeholder-product.png";

const EditProfile = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { userData, loading, refetch } = useUserData();

    const { register, handleSubmit, reset, setValue } = useForm();

    const Image_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;

    const [imgPreview, setImgPreview] = useState(null);

    useEffect(() => {
        if (!loading && userData) {
            reset({
                name: userData?.name || "",
                phone: userData?.phone || "",
            });
            setImgPreview(userData?.photoURL || FALLBACK_IMG);
        }
    }, [loading, userData, reset]);

    const onPickPhoto = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImgPreview(URL.createObjectURL(file));
    };

    const uploadToImgbb = async (file) => {
        const fd = new FormData();
        fd.append("image", file);

        const res = await axiosPublic.post(Image_API, fd, {
            headers: { "content-type": "multipart/form-data" },
        });

        if (res?.data?.success) return res.data.data.display_url;
        throw new Error("Image upload failed");
    };

    const onSubmit = async (data) => {
        if (!userData?.email) {
            Swal.fire({
                icon: "error",
                title: "User email missing",
                text: "Can't update profile without email.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (!data.name?.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Name required",
                text: "Please enter your name.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        const file = data.photo?.[0];

        try {
            Swal.fire({
                title: "Updating...",
                text: "Saving profile changes",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                confirmButtonColor: "#B08A3C",
                didOpen: () => Swal.showLoading(),
            });

            let photoURL = userData?.photoURL || "";

            // upload only if user selected new image
            if (file) {
                photoURL = await uploadToImgbb(file);
            }

            // update firebase auth profile
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: data.name.trim(),
                    photoURL: photoURL || "",
                });
            }

            // update database profile
            const payload = {
                name: data.name.trim(),
                phone: data.phone?.trim() || "",
                photoURL,
            };

            const res = await axiosSecure.patch("/api/users/profile", {
                email: userData.email,
                ...payload,
            });

            Swal.close();

            const ok =
                res?.data?.modifiedCount > 0 || res?.data?.message === "Profile updated";

            if (ok) {
                await refetch();
                await Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Profile updated successfully.",
                    confirmButtonColor: "#B08A3C",
                });
                navigate("/dashboard/my-profile");
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No changes",
                    text: "Nothing was updated.",
                    confirmButtonColor: "#B08A3C",
                });
            }
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error?.response?.data?.message || error.message,
                confirmButtonColor: "#B08A3C",
            });
        }
    };


    const resetPhoto = () => {
        setValue("photo", null);
        setImgPreview(userData?.photoURL || FALLBACK_IMG);
    };

    if (loading) return <Loading text={"Loading profile..."} />;

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="border border-neutral-200 rounded-md p-6 bg-white">
                    <div className="flex items-center justify-between gap-3">
                        <Link
                            to="/dashboard/my-profile"
                            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B08A3C] transition"
                        >
                            <FiArrowLeft /> Back
                        </Link>

                        <button
                            type="button"
                            onClick={resetPhoto}
                            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-[#B08A3C] transition"
                            title="Reset photo"
                        >
                            <FiX /> Reset Photo
                        </button>
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-neutral-800">
                        Edit Profile
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        Update your name, phone and profile photo.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                        {/* Photo */}
                        <div className="rounded-md border border-neutral-200 p-4">
                            <p className="text-xs tracking-[0.2em] text-neutral-500">
                                PROFILE PHOTO
                            </p>

                            <div className="mt-3 flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border border-[#B08A3C]/40 bg-[#B08A3C]/10">
                                    <img
                                        src={imgPreview || FALLBACK_IMG}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-neutral-900 text-white hover:opacity-95 transition cursor-pointer">
                                        <FiUploadCloud />
                                        Upload Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            {...register("photo", { onChange: onPickPhoto })}
                                        />
                                    </label>

                                    <p className="mt-2 text-xs text-neutral-400">
                                        PNG/JPG • square photo looks best
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Name + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Name" required>
                                <input
                                    {...register("name")}
                                    className={inputClass}
                                    placeholder="Your name"
                                />
                            </Field>

                            <Field label="Phone">
                                <input
                                    {...register("phone")}
                                    className={inputClass}
                                    placeholder="01XXXXXXXXX"
                                />
                            </Field>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

/* ---------- Small UI ---------- */
const Field = ({ label, required, children }) => (
    <label className="block">
        <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-neutral-700 font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
        </div>
        <div className="mt-2">{children}</div>
    </label>
);

const inputClass =
    "w-full px-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition";
