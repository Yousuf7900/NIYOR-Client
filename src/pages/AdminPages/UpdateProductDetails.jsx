import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiUploadCloud, FiX, FiArrowLeft } from "react-icons/fi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router";

const FALLBACK_IMG = "https://i.ibb.co/9y0JmZQ/placeholder-product.png";

const UpdateProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const Image_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const sizes = watch("sizes") || [];

    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);

    const [existingImgs, setExistingImgs] = useState([null, null, null]);

    const [loading, setLoading] = useState(true);

    // file change preview
    const image1 = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImg1(URL.createObjectURL(file));
    };
    const image2 = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImg2(URL.createObjectURL(file));
    };
    const image3 = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImg3(URL.createObjectURL(file));
    };

    // load product
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);

                const res = await axiosSecure.get(`/api/products/${id}`);
                const p = res?.data;

                if (!mounted) return;

                // images: prefer p.images array, fallback to p.image
                const imgs = Array.isArray(p?.images) ? p.images : [];
                const cover = p?.image || imgs?.[0] || null;

                const slot1 = cover || imgs?.[0] || null;
                const slot2 = imgs?.[1] || null;
                const slot3 = imgs?.[2] || null;

                setExistingImgs([slot1, slot2, slot3]);

                // show existing images as preview initially
                setImg1(slot1 || null);
                setImg2(slot2 || null);
                setImg3(slot3 || null);

                // Prefill form fields using your AddProduct names
                reset({
                    product_name: p?.name || "",
                    slug: p?.slug || "",
                    category: p?.category || "",
                    sku: p?.sku || "",
                    description: p?.description || "",
                    fabric: p?.fabric || "",
                    colors: Array.isArray(p?.colors) ? p.colors.join(", ") : (p?.colors || ""),
                    price: p?.price ?? "",
                    discountPrice: p?.discountPrice ?? "",
                    stockQty: p?.stockQty ?? p?.stock ?? "",
                    soldQty: p?.soldQty ?? p?.sold ?? p?.totalSold ?? p?.sales ?? 0,
                    sizes: Array.isArray(p?.sizes) ? p.sizes : [],
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to load product",
                    text: error?.response?.data?.message || "Server error. Please try again.",
                    confirmButtonColor: "#B08A3C",
                });
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => (mounted = false);
    }, [axiosSecure, id, reset]);

    // reset only selected images (not the whole form)
    const clearImages = () => {
        setImg1(existingImgs[0] || null);
        setImg2(existingImgs[1] || null);
        setImg3(existingImgs[2] || null);
        setValue("first", null);
        setValue("second", null);
        setValue("third", null);
    };

    // upload helper
    const uploadToImgbb = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axiosPublic.post(Image_API, formData, {
            headers: { "content-type": "multipart/form-data" },
        });

        if (res?.data?.success) return res.data.data.display_url;
        throw new Error("Image upload failed");
    };

    const onSubmit = async (data) => {
        const showLoading = () => {
            Swal.fire({
                title: "Please wait...",
                text: "Uploading images and updating product.",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                confirmButtonColor: "#B08A3C",
                didOpen: () => Swal.showLoading(),
            });
        };

        // Validation (similar to AddProduct)
        if (!data.product_name?.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Product name required",
                text: "Please enter the product name.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (!data.slug?.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Slug required",
                text: "Please enter a slug (lowercase + hyphen).",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (!data.category) {
            Swal.fire({
                icon: "warning",
                title: "Category required",
                text: "Please select a category.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (!data.description?.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Description required",
                text: "Please write a product description.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (!data.price || Number(data.price) <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Price required",
                text: "Please enter a valid price (must be greater than 0).",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (
            data.stockQty === undefined ||
            data.stockQty === null ||
            data.stockQty === "" ||
            Number(data.stockQty) < 0
        ) {
            Swal.fire({
                icon: "warning",
                title: "Stock required",
                text: "Please enter stock quantity (0 or more).",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (!data.sizes || (Array.isArray(data.sizes) && data.sizes.length === 0)) {
            Swal.fire({
                icon: "warning",
                title: "Size required",
                text: "Please select at least 1 size.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        // Cover required: either new file or existing cover url
        const coverFile = data.first?.[0];
        const hasExistingCover = Boolean(existingImgs?.[0]);
        if (!coverFile && !hasExistingCover) {
            Swal.fire({
                icon: "warning",
                title: "Cover photo required",
                text: "Please upload at least 1 cover image (Cover Photo).",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        showLoading();

        try {
            // Build final images array, keeping old URLs unless replaced
            const finalImages = [...existingImgs];

            // If user selects a new file in a slot, upload & replace URL
            if (data.first?.[0]) finalImages[0] = await uploadToImgbb(data.first[0]);
            if (data.second?.[0]) finalImages[1] = await uploadToImgbb(data.second[0]);
            if (data.third?.[0]) finalImages[2] = await uploadToImgbb(data.third[0]);

            // remove empty slots (optional images)
            const cleanedImages = finalImages.filter(Boolean);

            const updatedProduct = {
                name: data.product_name,
                slug: data.slug,
                category: data.category,
                sku: data.sku || null,
                description: data.description,
                fabric: data.fabric || null,
                colors: data.colors ? data.colors.split(",").map((c) => c.trim()) : [],
                price: Number(data.price),
                discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
                stockQty: Number(data.stockQty),
                soldQty: data.soldQty ? Number(data.soldQty) : 0,
                sizes: data.sizes || [],
                images: cleanedImages,
                image: cleanedImages?.[0] || null, // keep cover also in `image` if you use it
                inStock: Number(data.stockQty) > 0,
                updatedAt: new Date(),
            };

            const result = await axiosSecure.put(`/api/products/${id}`, updatedProduct);

            Swal.close();

            const ok =
                result?.data?.matchedCount > 0 ||
                result?.data?.modifiedCount > 0 ||
                result?.data?.message === "Product updated";

            if (ok) {
                Swal.fire({
                    icon: "success",
                    title: "Product Updated Successfully ✨",
                    text: "Your changes have been saved.",
                    confirmButtonText: "Manage Products",
                    confirmButtonColor: "#B08A3C",
                }).then(() => {
                    navigate("/dashboard/manage-products");
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No changes saved",
                    text: "It looks like nothing changed.",
                    confirmButtonColor: "#B08A3C",
                });
            }
        } catch (error) {
            console.error("❌ Product update failed.");
            console.error("Reason:", error.response?.data?.message || error.message);

            Swal.fire({
                icon: "error",
                title: "Failed to update product",
                text: error.response?.data?.message || "Server error. Please try again.",
                confirmButtonColor: "#B08A3C",
            });
        }
    };

    if (loading) {
        return (
            <div className="bg-white">
                <div className="border border-neutral-200 rounded-md p-6 bg-white">
                    <p className="text-sm text-neutral-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <Link
                                to="/dashboard/manage-products"
                                className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B08A3C] transition"
                            >
                                <FiArrowLeft /> Back
                            </Link>
                        </div>

                        <h2 className="text-lg font-semibold text-neutral-800 mt-3">
                            Update Product
                        </h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Update product images and edit required details.
                        </p>
                    </div>

                    <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full border border-[#B08A3C]/30 bg-[#B08A3C]/10 text-[#B08A3C]">
                        Admin
                    </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* IMAGE UPLOAD SECTION */}
                    <div className="mt-6 rounded-md border border-neutral-200 overflow-hidden">
                        <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2">
                            <span className="w-9 h-9 rounded-md bg-[#B08A3C]/10 border border-[#B08A3C]/25 text-[#B08A3C] flex items-center justify-center">
                                <FiImage />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-neutral-800">
                                    Product Photos
                                </p>
                                <p className="text-xs text-neutral-500">
                                    3 photos max • First one is cover (required)
                                </p>
                            </div>
                        </div>

                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Card 1 */}
                            <div className="rounded-md border border-neutral-200 bg-white overflow-hidden">
                                <div className="px-3 py-2 border-b border-neutral-200 flex items-center justify-between">
                                    <p className="text-sm font-medium text-neutral-800">
                                        Cover Photo <span className="text-red-500">*</span>
                                    </p>
                                    {img1 ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // revert to existing cover (or remove if none)
                                                setImg1(existingImgs[0] || null);
                                                setValue("first", null);
                                            }}
                                            title="Remove selected file"
                                        >
                                            <FiX />
                                        </button>
                                    ) : (
                                        <span className="text-[11px] px-2 py-1 rounded-full border border-[#B08A3C]/30 bg-[#B08A3C]/10 text-[#B08A3C]">
                                            Cover
                                        </span>
                                    )}
                                </div>

                                <div className="p-3">
                                    <div className="h-52 rounded-md border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden">
                                        {img1 ? (
                                            <img
                                                src={img1}
                                                className="w-full h-full object-contain bg-white"
                                                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                                                alt="cover"
                                            />
                                        ) : (
                                            <div className="text-center text-neutral-500">
                                                <div className="mx-auto w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                                                    <FiUploadCloud className="text-lg text-[#B08A3C]" />
                                                </div>
                                                <p className="text-xs mt-2">
                                                    Cover preview will appear here
                                                </p>
                                                <p className="text-[11px] text-neutral-400 mt-1">
                                                    Full image (not cropped)
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-3 block w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-[#B08A3C] file:text-white hover:file:opacity-95 cursor-pointer"
                                        {...register("first", { onChange: image1 })}
                                    />
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="rounded-md border border-neutral-200 bg-white overflow-hidden">
                                <div className="px-3 py-2 border-b border-neutral-200 flex items-center justify-between">
                                    <p className="text-sm font-medium text-neutral-800">Photo 2</p>
                                    {img2 ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImg2(existingImgs[1] || null);
                                                setValue("second", null);
                                            }}
                                            title="Remove selected file"
                                        >
                                            <FiX />
                                        </button>
                                    ) : (
                                        <span className="text-[11px] px-2 py-1 rounded-full border border-[#B08A3C]/30 bg-[#B08A3C]/10 text-[#B08A3C]">
                                            Optional
                                        </span>
                                    )}
                                </div>

                                <div className="p-3">
                                    <div className="h-52 rounded-md border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden">
                                        {img2 ? (
                                            <img
                                                src={img2}
                                                className="w-full h-full object-contain bg-white"
                                                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                                                alt="photo2"
                                            />
                                        ) : (
                                            <div className="text-center text-neutral-500">
                                                <div className="mx-auto w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                                                    <FiUploadCloud className="text-lg text-[#B08A3C]" />
                                                </div>
                                                <p className="text-xs mt-2">
                                                    Photo 2 preview will appear here
                                                </p>
                                                <p className="text-[11px] text-neutral-400 mt-1">
                                                    side/back/details
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-3 block w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-neutral-800 file:text-white hover:file:opacity-95 cursor-pointer"
                                        {...register("second", { onChange: image2 })}
                                    />
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="rounded-md border border-neutral-200 bg-white overflow-hidden">
                                <div className="px-3 py-2 border-b border-neutral-200 flex items-center justify-between">
                                    <p className="text-sm font-medium text-neutral-800">Photo 3</p>
                                    {img3 ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImg3(existingImgs[2] || null);
                                                setValue("third", null);
                                            }}
                                            title="Remove selected file"
                                        >
                                            <FiX />
                                        </button>
                                    ) : (
                                        <span className="text-[11px] px-2 py-1 rounded-full border border-[#B08A3C]/30 bg-[#B08A3C]/10 text-[#B08A3C]">
                                            Optional
                                        </span>
                                    )}
                                </div>

                                <div className="p-3">
                                    <div className="h-52 rounded-md border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden">
                                        {img3 ? (
                                            <img
                                                src={img3}
                                                className="w-full h-full object-contain bg-white"
                                                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                                                alt="photo3"
                                            />
                                        ) : (
                                            <div className="text-center text-neutral-500">
                                                <div className="mx-auto w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                                                    <FiUploadCloud className="text-lg text-[#B08A3C]" />
                                                </div>
                                                <p className="text-xs mt-2">
                                                    Photo 3 preview will appear here
                                                </p>
                                                <p className="text-[11px] text-neutral-400 mt-1">
                                                    extra angle
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-3 block w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-neutral-800 file:text-white hover:file:opacity-95 cursor-pointer"
                                        {...register("third", { onChange: image3 })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* small actions */}
                        <div className="px-4 py-3 border-t border-neutral-200 bg-white flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <button
                                type="button"
                                onClick={clearImages}
                                className="px-4 py-2 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                            >
                                Reset Images
                            </button>
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="mt-6 rounded-md border border-neutral-200 p-4 sm:p-5">
                        <p className="text-sm font-semibold text-neutral-800">Product Details</p>
                        <p className="text-xs text-neutral-500 mt-1">
                            Required fields are marked with (*).
                        </p>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Product Name" required>
                                <input
                                    {...register("product_name")}
                                    className={inputClass}
                                    placeholder="Ivory Heritage Panjabi"
                                />
                            </Field>

                            <Field label="Slug" required hint="lowercase + hyphen">
                                <input
                                    className={inputClass}
                                    placeholder="ivory-heritage-panjabi"
                                    {...register("slug")}
                                />
                            </Field>

                            <Field label="Category" required>
                                <select {...register("category")} className={inputClass} defaultValue="">
                                    <option value="" disabled>Select category</option>
                                    <option value="Panjabi">Panjabi</option>
                                    <option value="Shirt">Shirt</option>
                                    <option value="Pant">Pant</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </Field>

                            <Field label="SKU (Optional)">
                                <input {...register("sku")} className={inputClass} placeholder="NIYOR-PAN-002" />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field label="Description" required>
                                    <textarea
                                        {...register("description")}
                                        className={textareaClass}
                                        rows={4}
                                        placeholder="Elegant ivory panjabi inspired by heritage craftsmanship..."
                                    />
                                </Field>
                            </div>

                            <Field label="Fabric (Optional)">
                                <input {...register("fabric")} className={inputClass} placeholder="Khadi Cotton" />
                            </Field>

                            <Field label="Colors (Optional)" hint="Comma separated">
                                <input {...register("colors")} className={inputClass} placeholder="Ivory, Black, Olive" />
                            </Field>

                            <Field label="Price (৳)" required>
                                <input {...register("price")} className={inputClass} type="number" placeholder="3190" />
                            </Field>

                            <Field label="Discount Price (৳) (Optional)">
                                <input {...register("discountPrice")} className={inputClass} type="number" placeholder="Leave empty if none" />
                            </Field>

                            <Field label="Stock Qty" required>
                                <input {...register("stockQty")} className={inputClass} type="number" placeholder="18" />
                            </Field>

                            <Field label="Sold Qty (Optional)">
                                <input {...register("soldQty")} className={inputClass} type="number" placeholder="0" />
                            </Field>
                        </div>

                        {/* Sizes */}
                        <div className="mt-6">
                            <p className="text-sm font-semibold text-neutral-800">
                                Available Sizes <span className="text-red-500">*</span>
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">
                                Customers will see only selected sizes.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {["S", "M", "L", "XL", "XXL"].map((s) => (
                                    <label
                                        key={s}
                                        className="px-3 py-2 rounded-md border border-neutral-200 text-sm text-neutral-700 flex items-center gap-2 hover:border-[#B08A3C]/60 transition"
                                    >
                                        <input
                                            {...register("sizes")}
                                            value={s}
                                            type="checkbox"
                                            className="accent-[#B08A3C]"
                                        />
                                        {s}
                                    </label>
                                ))}
                            </div>

                            {Array.isArray(sizes) && sizes.length > 0 && (
                                <p className="mt-2 text-xs text-neutral-400">
                                    Selected: {sizes.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-4 py-2 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                        >
                            Reset Form
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductDetails;

/* ---------- Small UI ---------- */
const Field = ({ label, required, hint, children }) => (
    <label className="block">
        <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-neutral-700 font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            {hint && <span className="text-xs text-neutral-400">{hint}</span>}
        </div>
        <div className="mt-2">{children}</div>
    </label>
);

/* ---------- Classes ---------- */
const inputClass =
    "w-full px-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition";

const textareaClass =
    "w-full px-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition resize-none";
