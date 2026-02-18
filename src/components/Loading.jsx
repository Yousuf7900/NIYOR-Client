const Loading = ({text = "Hip Hip Hippu"}) => {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">

            <div className="flex flex-col items-center text-center space-y-6">

                <h1 className="text-xl tracking-[0.4em] font-medium text-[#B08A3C]">
                    NIYOR | নিওর
                </h1>

                <div className="w-24 h-px bg-neutral-200 relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-[#B08A3C] animate-loadingBar"></div>
                </div>

                <p className="text-xs tracking-[0.25em] text-neutral-500">
                    {text}
                </p>

            </div>

        </div>
    );
};

export default Loading;
