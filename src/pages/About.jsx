import { Helmet } from "react-helmet-async";

const About = () => {
    return (
        <div className="bg-white">
            <Helmet>
                <title>NIYOR | নিওর - ABOUT</title>
            </Helmet>
            <div className="relative h-[35vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1600&q=80"
                    alt="Khadi Fabric"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <h1 className="text-white text-3xl md:text-4xl tracking-[0.28em] font-light">
                        NIYOR | নিওর
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-20">

                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <p className="text-[#B08A3C] tracking-[0.35em] text-sm">
                        OUR STORY | আমাদের গল্প
                    </p>

                    <p className="text-neutral-700 leading-relaxed text-[15px]">
                        NIYOR was born from a desire to preserve the soul of Bengali textiles
                        while embracing contemporary minimal design.
                    </p>

                    <p className="text-neutral-600 leading-relaxed text-[15px]">
                        নিওর জন্ম নিয়েছে একটি স্বপ্ন থেকে — বাংলা ঐতিহ্যের
                        বুননকে আধুনিকতার ছোঁয়ায় নতুনভাবে উপস্থাপন করার জন্য।
                    </p>
                </div>

                <div className="flex items-center justify-center my-16">
                    <div className="w-16 h-px bg-neutral-300"></div>
                    <div className="mx-3 w-2 h-2 rounded-full bg-[#B08A3C]"></div>
                    <div className="w-16 h-px bg-neutral-300"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <div className="space-y-6">
                        <h2 className="text-xl tracking-wide text-neutral-800">
                            Fabric Philosophy
                        </h2>

                        <p className="text-neutral-600 leading-relaxed text-sm">
                            We work with breathable textures, hand-inspired patterns,
                            and timeless silhouettes. Every thread reflects patience,
                            intention, and quiet craftsmanship.
                        </p>

                        <p className="text-neutral-600 leading-relaxed text-sm">
                            আমাদের প্রতিটি কাপড়ে রয়েছে সময়, শ্রম এবং নীরব কারুকাজের ছাপ।
                            নিওর বিশ্বাস করে ধীরস্থির সৌন্দর্যে।
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-md border border-neutral-200">
                        <img
                            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80"
                            alt="Handwoven"
                            className="w-full h-87.5 object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                </div>

                <div className="mt-24 text-center max-w-2xl mx-auto bg-neutral-50 py-12 px-6 rounded-md">
                    <p className="text-neutral-800 italic text-lg leading-relaxed">
                        “Clothing should not be loud.
                        It should whisper identity.”
                    </p>
                    <p className="mt-4 text-[#B08A3C] tracking-[0.2em] text-sm">
                        — Founder, NIYOR
                    </p>
                </div>

                <div className="mt-24 grid md:grid-cols-3 gap-12 text-center">

                    <div className="space-y-3">
                        <h3 className="text-neutral-800 tracking-wide">
                            Heritage
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Rooted in Bengali textile traditions and cultural identity.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-neutral-800 tracking-wide">
                            Minimalism
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Clean lines, soft tones, and intentional simplicity.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-neutral-800 tracking-wide">
                            Craft
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Thoughtful design and quality fabrics built to last.
                        </p>
                    </div>

                </div>

                <div className="mt-24 text-center">
                    <p className="text-[#B08A3C] tracking-[0.25em] text-sm">
                        Designed with Heritage. Worn with Grace.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default About;