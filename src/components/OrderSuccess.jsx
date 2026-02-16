import { FiCheckCircle, FiCopy, FiHome, FiPackage, FiPhone } from "react-icons/fi";
import { Link } from "react-router";

const OrderSuccess = () => {
    const order = {
        id: "NIY-1042",
        date: "Today",
        payment: "COD", // "bKash"
        customerName: "NIYOR User",
        phone: "+880 18XXXXXXXX",
        address: "House 12, Road 3, Cumilla, Bangladesh",
        note: "Call before delivery",
        subtotal: 9470,
        shipping: 120,
        total: 9590,
        items: [
            { id: 1, name: "Classic White Panjabi", qty: 1, price: 2890 },
            { id: 2, name: "Olive Heritage Panjabi", qty: 2, price: 3290 },
        ],
    };

    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto px-4 py-14">
                {/* Top */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#B08A3C]/40 text-[#B08A3C] bg-white">
                        <FiCheckCircle size={22} />
                    </div>

                    <h1 className="mt-6 text-2xl md:text-3xl tracking-[0.22em] text-neutral-800">
                        ORDER CONFIRMED
                    </h1>
                    <p className="mt-3 text-[#B08A3C] tracking-[0.3em] text-xs">
                        NIYOR | নিওর
                    </p>

                    <p className="mt-5 text-sm text-neutral-600 max-w-2xl mx-auto">
                        Thank you! Your order has been placed successfully.
                    </p>
                    <p className="mt-2 text-sm text-neutral-500">
                        ধন্যবাদ! আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।
                    </p>
                </div>

                {/* Content */}
                <div className="mt-12 grid lg:grid-cols-12 gap-8">
                    {/* Left: Order details */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Order info card */}
                        <div className="border border-neutral-200 rounded-md p-6 bg-white">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs tracking-[0.25em] text-neutral-500">
                                        ORDER ID
                                    </p>
                                    <p className="mt-2 text-lg text-neutral-800 tracking-wide">
                                        {order.id}
                                    </p>
                                    <p className="mt-2 text-sm text-neutral-500">
                                        {order.date} • Payment:{" "}
                                        <span className="text-neutral-700">{order.payment}</span>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 px-3 py-2 border border-neutral-200 rounded-md text-sm text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
                                >
                                    <FiCopy />
                                    Copy
                                </button>
                            </div>

                            <div className="mt-6 h-px bg-neutral-200" />

                            {/* Next steps */}
                            <div className="mt-6">
                                <p className="text-xs tracking-[0.25em] text-neutral-500">
                                    NEXT STEPS
                                </p>

                                <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-[#B08A3C]" />
                                        We’ll confirm your order by phone if needed.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-[#B08A3C]" />
                                        Delivery usually takes 2–4 days (inside Bangladesh).
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-[#B08A3C]" />
                                        Please keep your phone active for smooth delivery.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Delivery details */}
                        <div className="border border-neutral-200 rounded-md p-6 bg-white">
                            <p className="text-xs tracking-[0.25em] text-neutral-500">
                                DELIVERY DETAILS
                            </p>

                            <div className="mt-4 space-y-3 text-sm">
                                <p className="text-neutral-700">
                                    <span className="text-neutral-500">Name:</span>{" "}
                                    {order.customerName}
                                </p>

                                <p className="text-neutral-700 flex items-center gap-2">
                                    <FiPhone className="text-[#B08A3C]" />
                                    {order.phone}
                                </p>

                                <p className="text-neutral-700">
                                    <span className="text-neutral-500">Address:</span>{" "}
                                    {order.address}
                                </p>

                                {order.note && (
                                    <p className="text-neutral-700">
                                        <span className="text-neutral-500">Note:</span>{" "}
                                        {order.note}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/orders"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-200 rounded-md text-sm text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C] transition-colors"
                            >
                                <FiPackage />
                                View My Orders
                            </Link>

                            <Link
                                to="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#B08A3C] text-[#B08A3C] bg-white hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md text-sm tracking-wide"
                            >
                                <FiHome />
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-5">
                        <div className="border border-neutral-200 rounded-md p-6 bg-neutral-50 sticky top-5">
                            <h2 className="text-base tracking-wide text-neutral-800">
                                Order Summary
                            </h2>

                            <div className="mt-5 space-y-3">
                                {order.items.map((p) => (
                                    <div key={p.id} className="flex justify-between gap-4">
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

                            <div className="mt-5 h-px bg-neutral-200" />

                            <div className="mt-5 space-y-2 text-sm">
                                <div className="flex justify-between text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>৳ {order.subtotal.toLocaleString("en-BD")}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <span>Shipping</span>
                                    <span>৳ {order.shipping.toLocaleString("en-BD")}</span>
                                </div>

                                <div className="h-px bg-neutral-200 my-2" />

                                <div className="flex justify-between text-neutral-800 font-medium">
                                    <span>Total</span>
                                    <span className="text-[#B08A3C]">
                                        ৳ {order.total.toLocaleString("en-BD")}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-neutral-500">
                                Payment method:{" "}
                                <span className="text-neutral-700">{order.payment}</span>
                            </p>

                            <p className="mt-2 text-xs text-neutral-500">
                                Need help? Contact NIYOR support.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <div className="mt-12 text-center text-xs text-neutral-500">
                    Keep your order ID safe for future reference.
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
