import { useRef, useState } from "react";
import { FiUploadCloud, FiImage, FiX, FiTag, FiDollarSign, FiPackage, FiFileText } from "react-icons/fi";

const AddProduct = () => {
    // UI-only previews (no backend)
    const [previews, setPreviews] = useState([null, null, null]); // 0..2
    const inputRefs = useRef([null, null, null]);

    const openPicker = (index) => {
        inputRefs.current[index]?.click();
    };

    const onPickImage = (index, file) => {
        if (!file) return;
        if (!file.type?.startsWith("image/")) return;

        const url = URL.createObjectURL(file);

        setPreviews((prev) => {
            const next = [...prev];

            // cleanup old url (avoid memory leak)
            if (next[index]) URL.revokeObjectURL(next[index]);

            next[index] = url;
            return next;
        });
    };

    const removeImage = (index) => {
        setPreviews((prev) => {
            const next = [...prev];
            if (next[index]) URL.revokeObjectURL(next[index]);
            next[index] = null;
            return next;
        });

        // reset file input value (so selecting same file again triggers change)
        if (inputRefs.current[index]) inputRefs.current[index].value = "";
    };

    const uploadedCount = previews.filter(Boolean).length;

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-6 bg-white">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-lg tracking-wide text-neutral-800">Add Product</h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Add a product with images, price, and stock.
                        </p>
                    </div>

                    <div className="text-sm text-neutral-500">
                        Images:{" "}
                        <span className="text-neutral-800 font-medium">{uploadedCount}/3</span>{" "}
                        <span className="text-neutral-400">(min 1)</span>
                    </div>
                </div>

                {/* Image Upload (Top) */}
                <div className="mt-6 border border-neutral-200 rounded-md p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-[#B08A3C]/40 bg-[#B08A3C]/10 flex items-center justify-center text-[#B08A3C]">
                                <FiImage />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-800 font-medium">Product Images</p>
                                <p className="text-xs text-neutral-500 mt-0.5">
                                    Upload minimum 1 image, maximum 3 images. First is cover.
                                </p>
                            </div>
                        </div>

                        {/* Optional quick button (keeps theme) */}
                        <button
                            type="button"
                            onClick={() => openPicker(0)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition"
                        >
                            <FiUploadCloud />
                            Upload Cover
                        </button>
                    </div>

                    {/* 3 Slots */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <ImageUploadBox
                            title="Cover (1st)"
                            hint="Required"
                            preview={previews[0]}
                            onPick={() => openPicker(0)}
                            onRemove={() => removeImage(0)}
                        />
                        <ImageUploadBox
                            title="Image 2"
                            hint="Optional"
                            preview={previews[1]}
                            onPick={() => openPicker(1)}
                            onRemove={() => removeImage(1)}
                        />
                        <ImageUploadBox
                            title="Image 3"
                            hint="Optional"
                            preview={previews[2]}
                            onPick={() => openPicker(2)}
                            onRemove={() => removeImage(2)}
                        />
                    </div>

                    {/* Hidden inputs (one per slot) */}
                    <div className="hidden">
                        {[0, 1, 2].map((i) => (
                            <input
                                key={i}
                                ref={(el) => (inputRefs.current[i] = el)}
                                type="file"
                                accept="image/*"
                                onChange={(e) => onPickImage(i, e.target.files?.[0])}
                            />
                        ))}
                    </div>

                    <p className="mt-3 text-xs text-neutral-400">
                        Tip: Use a clean, bright cover image for better CTR.
                    </p>
                </div>

                {/* Simple Form (same as your reference) */}
                <form className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left */}
                        <div className="lg:col-span-2 border border-neutral-200 rounded-md p-4 sm:p-5 bg-white">
                            <SectionTitle icon={<FiTag />} title="Basic Info" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <Field label="Product Name" required>
                                    <input className={inputClass} type="text" placeholder="e.g. Classic White Panjabi" />
                                </Field>

                                <Field label="Category" required>
                                    <select className={inputClass} defaultValue="">
                                        <option value="" disabled>
                                            Select category
                                        </option>
                                        <option>Panjabi</option>
                                        <option>Shirt</option>
                                        <option>Pant</option>
                                        <option>Accessories</option>
                                    </select>
                                </Field>
                            </div>

                            <div className="mt-4">
                                <Field label="Short Description" required>
                                    <textarea
                                        className={textareaClass}
                                        rows={4}
                                        placeholder="A short description customers will see..."
                                    />
                                </Field>
                            </div>

                            <div className="mt-6">
                                <SectionTitle icon={<FiDollarSign />} title="Price & Stock" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <Field label="Price (৳)" required>
                                    <input className={inputClass} type="number" placeholder="2890" />
                                </Field>

                                <Field label="Stock Quantity" required>
                                    <input className={inputClass} type="number" placeholder="50" />
                                </Field>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="border border-neutral-200 rounded-md p-4 sm:p-5 bg-white">
                            <SectionTitle icon={<FiPackage />} title="Product Status" />

                            <div className="mt-4 space-y-4">
                                <Field label="Visibility" required>
                                    <select className={inputClass} defaultValue="draft">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </Field>

                                <Field label="SKU (Optional)">
                                    <input className={inputClass} type="text" placeholder="NIY-001" />
                                </Field>

                                <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3">
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#B08A3C] mt-0.5">
                                            <FiFileText />
                                        </span>
                                        <p className="text-xs text-neutral-500 leading-relaxed">
                                            Draft keeps it hidden from customers. Publish when everything looks good.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions (UI only) */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm rounded-md border border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="px-4 py-2 text-sm rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition"
                        >
                            Save Draft
                        </button>

                        <button
                            type="button"
                            className="px-4 py-2 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
                        >
                            Create Product
                        </button>
                    </div>

                    <p className="mt-4 text-xs text-neutral-400">
                        Tip: Keep product name + price clear — it increases conversion.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

/* ---------- small UI components ---------- */

const SectionTitle = ({ icon, title }) => (
    <div className="flex items-center gap-2">
        <span className="w-9 h-9 rounded-full border border-[#B08A3C]/40 bg-[#B08A3C]/10 text-[#B08A3C] flex items-center justify-center">
            {icon}
        </span>
        <h3 className="text-sm tracking-wide text-neutral-800 font-medium">{title}</h3>
    </div>
);

const Field = ({ label, required, children }) => (
    <label className="block">
        <span className="text-sm text-neutral-700">
            {label} {required && <span className="text-red-500">*</span>}
        </span>
        <div className="mt-2">{children}</div>
    </label>
);

const ImageUploadBox = ({ title, hint, preview, onPick, onRemove }) => {
    return (
        <div className="rounded-md border border-neutral-200 overflow-hidden bg-white">
            {/* Preview Area */}
            <button
                type="button"
                onClick={onPick}
                className={`w-full h-44 sm:h-40 md:h-44 relative flex items-center justify-center transition
          ${preview ? "bg-neutral-50" : "bg-white hover:bg-neutral-50"}`}
                title="Click to upload"
            >
                {preview ? (
                    <img src={preview} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-neutral-400">
                        <FiUploadCloud className="text-xl" />
                        <span className="text-xs">Click to upload</span>
                    </div>
                )}

                {preview && (
                    <span className="absolute top-2 left-2 text-[11px] px-2 py-1 rounded-md border border-white/40 bg-black/40 text-white">
                        Preview
                    </span>
                )}
            </button>

            {/* Footer */}
            <div className="p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm text-neutral-700 font-medium truncate">{title}</p>
                    <p className="text-xs text-neutral-500 truncate">{hint}</p>
                </div>

                {preview ? (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="w-9 h-9 rounded-md border border-neutral-200 text-neutral-600 hover:border-red-200 hover:text-red-500 transition inline-flex items-center justify-center"
                        title="Remove"
                        aria-label="Remove"
                    >
                        <FiX />
                    </button>
                ) : (
                    <span className="text-xs text-neutral-400">—</span>
                )}
            </div>
        </div>
    );
};

/* ---------- classes ---------- */

const inputClass =
    "w-full px-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition";

const textareaClass =
    "w-full px-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition resize-none";
