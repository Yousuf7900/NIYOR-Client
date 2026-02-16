import { FiMinus, FiPlus, FiTrash2, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";
import image1 from "../assets/Images/1.webp";
import image2 from "../assets/Images/2.webp";

const Cart = () => {
    const cartItems = [
        {
            id: 1,
            name: "Classic White Panjabi",
            fabric: "Khadi Blend",
            price: 2890,
            qty: 1,
            image: image1,
        },
        {
            id: 2,
            name: "Olive Heritage Panjabi",
            fabric: "Cotton Khadi",
            price: 3290,
            qty: 2,
            image: image2,
        },
    ];

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = cartItems.length ? 120 : 0;
    const total = subtotal + shipping;

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Header (compact) */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl tracking-[0.22em] text-neutral-800">
                        CART
                    </h1>
                    <p className="mt-2 text-[#B08A3C] tracking-[0.28em] text-xs">
                        NIYOR | নিওর
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Items */}
                    <div className="lg:col-span-8">
                        {/* List header (desktop only) */}
                        <div className="hidden md:grid grid-cols-12 text-xs tracking-[0.2em] text-neutral-500 pb-3">
                            <div className="col-span-6">PRODUCT</div>
                            <div className="col-span-2 text-center">QTY</div>
                            <div className="col-span-3 text-right">TOTAL</div>
                            <div className="col-span-1 text-right"> </div>
                        </div>

                        <div className="space-y-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-neutral-200 rounded-md px-3 py-3 md:py-2 bg-white hover:border-[#B08A3C] transition-colors"
                                >
                                    <div className="grid grid-cols-12 items-center gap-3">
                                        {/* Product (image + text) */}
                                        <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                                            <div className="w-14 h-16 md:w-12 md:h-14 rounded-md border border-neutral-200 bg-neutral-50 overflow-hidden flex items-center justify-center shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm text-neutral-800 tracking-wide truncate">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-neutral-500 truncate">
                                                    {item.fabric} • ৳ {item.price.toLocaleString("en-BD")}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Qty */}
                                        <div className="col-span-7 md:col-span-2 flex md:justify-center">
                                            <div className="inline-flex items-center border border-neutral-200 rounded-md overflow-hidden">
                                                <button
                                                    type="button"
                                                    className="px-2.5 py-2 text-neutral-600 hover:text-[#B08A3C] transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <FiMinus />
                                                </button>

                                                <span className="px-3 py-2 text-sm text-neutral-700 border-x border-neutral-200">
                                                    {item.qty}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="px-2.5 py-2 text-neutral-600 hover:text-[#B08A3C] transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <FiPlus />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Line total */}
                                        <div className="col-span-4 md:col-span-3 text-right">
                                            <p className="text-sm font-medium text-[#B08A3C]">
                                                ৳ {(item.price * item.qty).toLocaleString("en-BD")}
                                            </p>
                                            <p className="md:hidden text-[11px] text-neutral-500">
                                                total
                                            </p>
                                        </div>

                                        {/* Remove */}
                                        <div className="col-span-1 text-right">
                                            <button
                                                type="button"
                                                className="text-neutral-400 hover:text-[#B08A3C] transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom actions (compact) */}
                        <div className="flex items-center justify-between mt-6">
                            <Link
                                to="/shop"
                                className="text-sm text-neutral-600 hover:text-[#B08A3C] transition-colors"
                            >
                                ← Continue Shopping
                            </Link>

                            <button
                                type="button"
                                className="text-sm text-neutral-600 hover:text-[#B08A3C] transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4">
                        <div className="border border-neutral-200 rounded-md p-5 bg-neutral-50 sticky top-5">
                            <h2 className="text-base tracking-wide text-neutral-800">
                                Summary
                            </h2>

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
                                Payment: <span className="text-neutral-700">COD</span>
                            </p>

                            <Link
                                to="/checkout"
                                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#B08A3C] text-[#B08A3C] bg-white hover:bg-[#B08A3C] hover:text-white transition-all duration-300 rounded-md text-sm tracking-wide"
                            >
                                Checkout <FiArrowRight />
                            </Link>

                            <p className="mt-3 text-center text-xs text-neutral-500">
                                Delivery details in next step
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center text-xs text-neutral-500">
                    Items: <span className="text-neutral-700">{cartItems.length}</span>
                </div>
            </div>
        </div>
    );
};

export default Cart;
