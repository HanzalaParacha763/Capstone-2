import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-lime-100 via-yellow-50 to-emerald-100 text-center px-6">
            <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-lime-600 tracking-widest drop-shadow-lg">
                404
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-emerald-700 mb-4">
                Oops! Page Not Found
            </p>
            <p className="text-gray-600 max-w-md mb-8">
                The page you're looking for doesn't exist or may have been moved.
                Let's get you back to shopping!
            </p>

            <Link
                to="/"
                className="inline-block bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
                ⬅ Back to Home
            </Link>

            <div className="mt-12 w-full max-w-md">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-lime-400 to-emerald-400 blur-3xl opacity-40 animate-pulse rounded-full"></div>
                    <div className="relative z-10 text-emerald-700 text-sm md:text-base font-medium">
                        <p className="bg-white/70 p-4 rounded-2xl shadow-inner backdrop-blur-sm">
                            Maybe try searching for what you need or explore our latest collections.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
