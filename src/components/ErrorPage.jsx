import { useNavigate } from "react-router";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="text-center max-w-md">

                <h1 className="text-6xl font-light tracking-[0.2em] text-neutral-800">
                    404
                </h1>

                <p className="mt-4 text-sm tracking-[0.3em] text-[#B08A3C]">
                    NIYOR | নিওর
                </p>

                <p className="mt-6 text-neutral-600 text-sm">
                    The page you are looking for does not exist or has been moved.
                </p>

                <div className="mt-8 flex justify-center gap-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm tracking-wide text-neutral-700 hover:text-[#B08A3C] transition-colors duration-300"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="text-sm tracking-wide text-neutral-700 hover:text-[#B08A3C] transition-colors duration-300"
                    >
                        Go Home
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ErrorPage;
