import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiUploadCloud, FiX } from "react-icons/fi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddProduct = () => {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const Image_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const sizes = watch("sizes") || [];

    // for image preview
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);

    const image1 = e => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImg1(URL.createObjectURL(file));
    };
    const image2 = e => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImg2(URL.createObjectURL(file));
    };
    const image3 = e => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImg3(URL.createObjectURL(file));
    };

    // to reset the form
    const clearAll = () => {
        reset();
        setImg1(null);
        setImg2(null);
        setImg3(null);
    };

    const onSubmit = async (data) => {

        // Cover image required
        if (!data.first?.[0]) {
            Swal.fire({
                icon: "warning",
                title: "Cover photo required",
                text: "Please upload at least 1 cover image (Cover Photo).",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        // Required text fields
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

        // Required numbers
        if (!data.price || Number(data.price) <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Price required",
                text: "Please enter a valid price (must be greater than 0).",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        if (data.stockQty === undefined || data.stockQty === null || data.stockQty === "" || Number(data.stockQty) < 0) {
            Swal.fire({
                icon: "warning",
                title: "Stock required",
                text: "Please enter stock quantity (0 or more).",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        // Sizes required (at least one)
        if (!data.sizes || (Array.isArray(data.sizes) && data.sizes.length === 0)) {
            Swal.fire({
                icon: "warning",
                title: "Size required",
                text: "Please select at least 1 size.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        console.log(data);

        const files = [
            data.first?.[0],
            data.second?.[0],
            data.third?.[0]
        ].filter(Boolean);

        if (files.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No image selected",
                text: "Please select at least one image.",
                confirmButtonColor: "#B08A3C",
            });
            return;
        }

        const imageUrls = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            const res = await axiosPublic.post(Image_API, formData, {
                headers: { 'content-type': 'multipart/form-data' },
            });

            if (res?.data?.success) {
                imageUrls.push(res.data.data.display_url);
            }
        }

        const product = {
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
            images: imageUrls,
            inStock: Number(data.stockQty) > 0,
            isFeatured: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        console.log("Final Product Object:", product);

        try {
            const result = await axiosSecure.post('/api/products', product);
            console.log("✅ Product created successfully:", result.data);

            Swal.fire({
                icon: "success",
                title: "Product added!",
                text: "Product created successfully.",
                confirmButtonColor: "#B08A3C",
            });

            clearAll();
        } catch (error) {
            console.error("❌ Product creation failed.");
            console.error("Reason:", error.response?.data?.message || error.message);

            Swal.fire({
                icon: "error",
                title: "Failed to add product",
                text: error.response?.data?.message || "Server error. Please try again.",
                confirmButtonColor: "#B08A3C",
            });
        }
    }

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-800">Add Product</h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Upload product images and fill required details.
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
                                <p className="text-sm font-semibold text-neutral-800">Product Photos</p>
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
                                    {
                                        img1
                                            ? <button type="button" onClick={() => { setImg1(null); setValue('first', null) }}><FiX /></button>
                                            : <span className="text-[11px] px-2 py-1 rounded-full border border-[#B08A3C]/30 bg-[#B08A3C]/10 text-[#B08A3C]">Cover</span>
                                    }
                                </div>

                                <div className="p-3">
                                    <div className="h-52 rounded-md border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden">
                                        {
                                            img1 ? (<img src={img1} className="w-full h-full object-contain bg-white" />) :
                                                <div className="text-center text-neutral-500">
                                                    <div className="mx-auto w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                                                        <FiUploadCloud className="text-lg text-[#B08A3C]" />
                                                    </div>
                                                    <p className="text-xs mt-2">Cover preview will appear here</p>
                                                    <p className="text-[11px] text-neutral-400 mt-1">Full image (not cropped)</p>
                                                </div>}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-3 block w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-[#B08A3C] file:text-white hover:file:opacity-95 cursor-pointer"
                                        {...register('first', { onChange: image1, required: false })}
                                    />
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="rounded-md border border-neutral-200 bg-white overflow-hidden">
                                <div className="px-3 py-2 border-b border-neutral-200 flex items-center justify-between">
                                    <p className="text-sm font-medium text-neutral-800">Photo 2</p>
                                    {
                                        img2
                                            ? <button type="button" onClick={() => { setImg2(null); setValue('second', null) }}><FiX /></button>
                                            : <span className="text-[11px] px-2 py-1 rounded-full border border-[#B08A3C]/30 bg-[#B08A3C]/10 text-[#B08A3C]">Optional</span>
                                    }
                                </div>

                                <div className="p-3">
                                    <div className="h-52 rounded-md border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden">
                                        {img2 ? <img src={img2} className="w-full h-full object-contain bg-white" /> :
                                            <div className="text-center text-neutral-500">
                                                <div className="mx-auto w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                                                    <FiUploadCloud className="text-lg text-[#B08A3C]" />
                                                </div>
                                                <p className="text-xs mt-2">Photo 2 preview will appear here</p>
                                                <p className="text-[11px] text-neutral-400 mt-1">side/back/details</p>
                                            </div>}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-3 block w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-neutral-800 file:text-white hover:file:opacity-95 cursor-pointer"
                                        {...register('second', { onChange: image2 })}
                                    />
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="rounded-md border border-neutral-200 bg-white overflow-hidden">
                                <div className="px-3 py-2 border-b border-neutral-200 flex items-center justify-between">
                                    <p className="text-sm font-medium text-neutral-800">Photo 3</p>
                                    {
                                        img3
                                            ? <button type="button" onClick={() => { setImg3(null); setValue('third', null) }}><FiX /></button>
                                            : <span className="text-[11px] px-2 py-1 rounded-full border border-[#B08A3C]/30 bg-[#B08A3C]/10 text-[#B08A3C]">Optional</span>
                                    }
                                </div>

                                <div className="p-3">
                                    <div className="h-52 rounded-md border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden">
                                        {img3 ? <img src={img3} className="w-full h-full object-contain bg-white" /> :
                                            <div className="text-center text-neutral-500">
                                                <div className="mx-auto w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                                                    <FiUploadCloud className="text-lg text-[#B08A3C]" />
                                                </div>
                                                <p className="text-xs mt-2">Photo 3 preview will appear here</p>
                                                <p className="text-[11px] text-neutral-400 mt-1">extra angle</p>
                                            </div>}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-3 block w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-neutral-800 file:text-white hover:file:opacity-95 cursor-pointer"
                                        {...register('third', { onChange: image3 })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DETAILS (DESIGN ONLY) */}
                    <div className="mt-6 rounded-md border border-neutral-200 p-4 sm:p-5">
                        <p className="text-sm font-semibold text-neutral-800">Product Details</p>
                        <p className="text-xs text-neutral-500 mt-1">
                            Required fields are marked with (*).
                        </p>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Product Name" required>
                                <input {...register('product_name', { required: false })} className={inputClass} placeholder="Ivory Heritage Panjabi" />
                            </Field>

                            <Field label="Slug" required hint="lowercase + hyphen">
                                <input className={inputClass} placeholder="ivory-heritage-panjabi" {...register('slug', { required: false })} />
                            </Field>

                            <Field label="Category" required>
                                <select {...register('category', { required: false })} className={inputClass} defaultValue="">
                                    <option value="" disabled>Select category</option>
                                    <option value="Panjabi">Panjabi</option>
                                    <option value="Shirt">Shirt</option>
                                    <option value="Pant">Pant</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </Field>

                            <Field label="SKU (Optional)">
                                <input {...register('sku')} className={inputClass} placeholder="NIYOR-PAN-002" />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field label="Description" required>
                                    <textarea
                                        {...register('description', { required: false })}
                                        className={textareaClass}
                                        rows={4}
                                        placeholder="Elegant ivory panjabi inspired by heritage craftsmanship..."
                                    />
                                </Field>
                            </div>

                            <Field label="Fabric (Optional)">
                                <input {...register('fabric')} className={inputClass} placeholder="Khadi Cotton" />
                            </Field>

                            <Field label="Colors (Optional)" hint="Comma separated">
                                <input {...register('colors')} className={inputClass} placeholder="Ivory, Black, Olive" />
                            </Field>

                            <Field label="Price (৳)" required>
                                <input {...register('price', { required: false })} className={inputClass} type="number" placeholder="3190" />
                            </Field>

                            <Field label="Discount Price (৳) (Optional)">
                                <input {...register('discountPrice')} className={inputClass} type="number" placeholder="Leave empty if none" />
                            </Field>

                            <Field label="Stock Qty" required>
                                <input {...register('stockQty', { required: false })} className={inputClass} type="number" placeholder="18" />
                            </Field>

                            <Field label="Sold Qty (Optional)">
                                <input {...register('soldQty')} className={inputClass} type="number" placeholder="0" />
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
                                        <input {...register('sizes', { required: false })} value={s} type="checkbox" className="accent-[#B08A3C]" />
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

                    {/* Actions (DESIGN ONLY) */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button
                            onClick={clearAll}
                            type="button"
                            className="px-4 py-2 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddProduct;

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
