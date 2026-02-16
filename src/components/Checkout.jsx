import { useState } from "react";
import { FiCheckCircle, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { Link } from "react-router";

const Checkout = () => {
    // Dummy cart items (replace later)
    const items = [
        { id: 1, name: "Classic White Panjabi", price: 2890, qty: 1 },
        { id: 2, name: "Olive Heritage Panjabi", price: 3290, qty: 2 },
    ];

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = items.length ? 120 : 0;
    const total = subtotal + shipping;

    // Payment UI only
    const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" | "bkash"

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-2xl md:text-3xl tracking-[0.22em] text-neutral-800">
                        CHECKOUT
                    </h1>
                    <p className="mt-2 text-[#B08A3C] tracking-[0.28em] text-xs">
                        NIYOR | নিওর
                    </p>
                    <p className="mt-4 text-sm text-neutral-600 max-w-2xl mx-auto">
                        Please provide accurate delivery information for smooth shipping.
                    </p>
                    <p className="mt-2 text-sm text-neutral-500">
                        সঠিক তথ্য দিলে ডেলিভারি সহজ হবে।
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left: Delivery + Payment */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Delivery Form */}
                        <div className="border border-neutral-200 rounded-md p-6 md:p-7 bg-white">
                            <h2 className="text-base tracking-wide text-neutral-800">
                                Delivery Information
                            </h2>
                            <p className="mt-2 text-sm text-neutral-500">
                                We may call to confirm before shipping.
                            </p>

                            <form className="mt-6 space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="text-xs tracking-[0.2em] text-neutral-500">
                                        FULL NAME
                                    </label>
                                    <div className="mt-2 flex items-center gap-2 border border-neutral-200 rounded-md px-3 py-2.5 focus-within:border-[#B08A3C] transition-colors">
                                        <FiUser className="text-neutral-400" />
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-xs tracking-[0.2em] text-neutral-500">
                                        PHONE NUMBER
                                    </label>
                                    <div className="mt-2 flex items-center gap-2 border border-neutral-200 rounded-md px-3 py-2.5 focus-within:border-[#B08A3C] transition-colors">
                                        <FiPhone className="text-neutral-400" />
                                        <input
                                            type="tel"
                                            placeholder="+880 1XXXXXXXXX"
                                            className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="text-xs tracking-[0.2em] text-neutral-500">
                                        FULL ADDRESS
                                    </label>
                                    <div className="mt-2 flex items-start gap-2 border border-neutral-200 rounded-md px-3 py-2.5 focus-within:border-[#B08A3C] transition-colors">
                                        <FiMapPin className="text-neutral-400 mt-1" />
                                        <textarea
                                            rows="3"
                                            placeholder="House, road, area, city"
                                            className="w-full text-sm outline-none text-neutral-700 placeholder:text-neutral-400 resize-none"
                                        />
                                    </div>
                                </div>

                                {/* District + Thana */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs tracking-[0.2em] text-neutral-500">
                                            DISTRICT
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Cumilla"
                                            className="mt-2 w-full border border-neutral-200 rounded-md px-4 py-2.5 text-sm outline-none text-neutral-700 placeholder:text-neutral-400 focus:border-[#B08A3C] transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs tracking-[0.2em] text-neutral-500">
                                            THANA / UPAZILA
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Kotwali"
                                            className="mt-2 w-full border border-neutral-200 rounded-md px-4 py-2.5 text-sm outline-none text-neutral-700 placeholder:text-neutral-400 focus:border-[#B08A3C] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Note */}
                                <div>
                                    <label className="text-xs tracking-[0.2em] text-neutral-500">
                                        DELIVERY NOTE (OPTIONAL)
                                    </label>
                                    <textarea
                                        rows="2"
                                        placeholder="Call before delivery, leave at gate, etc."
                                        className="mt-2 w-full border border-neutral-200 rounded-md px-4 py-2.5 text-sm outline-none text-neutral-700 placeholder:text-neutral-400 focus:border-[#B08A3C] transition-colors resize-none"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Payment Method */}
                        <div className="border border-neutral-200 rounded-md p-6 md:p-7 bg-white">
                            <h2 className="text-base tracking-wide text-neutral-800">
                                Payment Method
                            </h2>
                            <p className="mt-2 text-sm text-neutral-500">
                                Choose how you want to pay.
                            </p>

                            <div className="mt-6 space-y-3">
                                {/* COD */}
                                <label
                                    className={`flex items-start justify-between gap-4 border rounded-md p-4 cursor-pointer transition-colors ${paymentMethod === "cod"
                                            ? "border-[#B08A3C] bg-[#B08A3C]/5"
                                            : "border-neutral-200 hover:border-[#B08A3C]/60"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            className="radio radio-sm mt-1"
                                            checked={paymentMethod === "cod"}
                                            onChange={() => setPaymentMethod("cod")}
                                        />
                                        <div>
                                            <p className="text-sm text-neutral-800 tracking-wide">
                                                Cash on Delivery (COD)
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-500">
                                                Pay when you receive the product.
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-500">
                                                পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
                                            </p>
                                        </div>
                                    </div>

                                    {paymentMethod === "cod" && (
                                        <span className="text-[#B08A3C] text-sm">
                                            <FiCheckCircle />
                                        </span>
                                    )}
                                </label>

                                {/* bKash Accordion */}
                                <div
                                    className={`border rounded-md transition-colors ${paymentMethod === "bkash"
                                            ? "border-[#B08A3C] bg-[#B08A3C]/5"
                                            : "border-neutral-200 hover:border-[#B08A3C]/60"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("bkash")}
                                        className="w-full flex items-start justify-between gap-4 p-4 text-left"
                                    >
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="radio radio-sm mt-1"
                                                checked={paymentMethod === "bkash"}
                                                onChange={() => setPaymentMethod("bkash")}
                                            />
                                            <div>
                                                <p className="text-sm text-neutral-800 tracking-wide">
                                                    bKash Payment
                                                </p>
                                                <p className="mt-1 text-xs text-neutral-500">
                                                    Pay via bKash and submit transaction details.
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`text-xs tracking-[0.25em] ${paymentMethod === "bkash"
                                                    ? "text-[#B08A3C]"
                                                    : "text-neutral-400"
                                                }`}
                                        >
                                            {paymentMethod === "bkash" ? "OPEN" : "SELECT"}
                                        </span>
                                    </button>

                                    {paymentMethod === "bkash" && (
                                        <div className="px-4 pb-4">
                                            <div className="h-px bg-neutral-200 my-3" />

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs tracking-[0.2em] text-neutral-500">
                                                        BKASH NUMBER
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        placeholder="01XXXXXXXXX"
                                                        className="mt-2 w-full border border-neutral-200 rounded-md px-4 py-2.5 text-sm outline-none text-neutral-700 placeholder:text-neutral-400 focus:border-[#B08A3C] transition-colors bg-white"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs tracking-[0.2em] text-neutral-500">
                                                        TRANSACTION ID (TRXID)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. 9A7B6C..."
                                                        className="mt-2 w-full border border-neutral-200 rounded-md px-4 py-2.5 text-sm outline-none text-neutral-700 placeholder:text-neutral-400 focus:border-[#B08A3C] transition-colors bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <p className="mt-3 text-xs text-neutral-500">
                                                After payment, enter your bKash number and TrxID.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Place order button (design-only) */}
                            <Link to={'/order-success'}
                                
                                className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 border border-[#B08A3C] text-[#B08A3C] bg-white hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md text-sm tracking-wide"
                            >
                                <FiCheckCircle />
                                Place Order
                            </Link>

                            <div className="mt-4 text-sm text-neutral-500">
                                <Link
                                    to="/cart"
                                    className="hover:text-[#B08A3C] transition-colors"
                                >
                                    ← Back to Cart
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="border border-neutral-200 rounded-md p-5 bg-neutral-50 sticky top-5">
                            <h2 className="text-base tracking-wide text-neutral-800">
                                Order Summary
                            </h2>

                            <div className="mt-4 space-y-3">
                                {items.map((p) => (
                                    <div key={p.id} className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-sm text-neutral-800 truncate">
                                                {p.name}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                ৳ {p.price.toLocaleString("en-BD")} × {p.qty}
                                            </p>
                                        </div>
                                        <p className="text-sm text-neutral-700">
                                            ৳ {(p.price * p.qty).toLocaleString("en-BD")}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 h-px bg-neutral-200" />

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>৳ {subtotal.toLocaleString("en-BD")}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <span>Shipping</span>
                                    <span>৳ {shipping.toLocaleString("en-BD")}</span>
                                </div>

                                <div className="h-px bg-neutral-200 my-2" />

                                <div className="flex justify-between text-neutral-800 font-medium">
                                    <span>Total</span>
                                    <span className="text-[#B08A3C]">
                                        ৳ {total.toLocaleString("en-BD")}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-neutral-500">
                                Selected payment:{" "}
                                <span className="text-neutral-700">
                                    {paymentMethod === "cod" ? "COD" : "bKash"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
