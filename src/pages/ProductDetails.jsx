import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartList";
import {
    Box,
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import { motion, AnimatePresence } from "framer-motion";
import products from "../products/products.json";

export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id));
    const dispatch = useDispatch();

    const [mainImage, setMainImage] = useState(product?.image1);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [progress, setProgress] = useState(0);

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Typography variant="h4" className="text-lime-700 font-bold mb-4">
                    Product Not Found
                </Typography>
                <Link to="/products">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#eab308",
                            "&:hover": { backgroundColor: "#ca8a04" },
                            borderRadius: "9999px",
                            textTransform: "none",
                        }}
                    >
                        Back to Products
                    </Button>
                </Link>
            </div>
        );
    }

    const cleanPrice = Number(product.price.replace(/[^0-9.]/g, ""));

    const increaseQty = () => setQuantity((prev) => prev + 1);
    const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            dispatch(
                addItem({
                    id: product.id,
                    name: product.name,
                    price: cleanPrice,
                    image: product.image1,
                })
            );
        }

        // Trigger toast
        setShowToast(true);
        setProgress(0);

        // Animate progress for 3 seconds
        const duration = 3000;
        const step = 100 / (duration / 50);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowToast(false), 250);
                    return 100;
                }
                return prev + step;
            });
        }, 50);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-lime-50 flex flex-col items-center py-16 px-6 md:px-20 relative">
            {/* Back Button */}
            <div className="self-start mb-6">
                <Link to="/products">
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#84cc16",
                            color: "#84cc16",
                            borderRadius: "9999px",
                            textTransform: "none",
                            fontWeight: "600",
                            "&:hover": {
                                borderColor: "#65a30d",
                                backgroundColor: "#ecfccb",
                            },
                        }}
                    >
                        ← Back to Products
                    </Button>
                </Link>
            </div>

            {/* Product Card */}
            <Card className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-3xl bg-white overflow-hidden">
                {/* Product Image Section */}
                <div className="md:w-1/2 flex flex-col items-center p-6">
                    <div className="relative w-full overflow-hidden rounded-2xl mb-6 bg-white flex items-center justify-center aspect-square">
                        <CardMedia
                            component="img"
                            image={mainImage}
                            alt={product.name}
                            className="max-h-[400px] object-contain transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex justify-center gap-4">
                        {[product.image1, product.image2, product.image3]
                            .filter(Boolean)
                            .map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => setMainImage(img)}
                                    className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-300 
                                        ${mainImage === img
                                            ? "border-lime-600 scale-105"
                                            : "border-transparent hover:border-lime-400 hover:scale-105"
                                        }`}
                                />
                            ))}
                    </div>
                </div>

                {/* Product Info */}
                <CardContent className="md:w-1/2 flex flex-col justify-evenly p-8">
                    <Typography variant="h4" className="font-extrabold text-lime-700 mb-3">
                        {product.name}
                    </Typography>

                    <Typography
                        variant="body2"
                        className="text-gray-500 font-semibold uppercase tracking-wide mb-3"
                    >
                        {product.category}
                    </Typography>

                    <Typography variant="h6" className="text-gray-800 font-bold mb-4">
                        {product.price}
                    </Typography>

                    <Typography variant="body1" className="text-gray-600 leading-relaxed mb-6">
                        {product.description}
                    </Typography>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mb-6">
                        <IconButton
                            onClick={decreaseQty}
                            sx={{
                                border: "1px solid #84cc16",
                                color: "#84cc16",
                                "&:hover": { backgroundColor: "#f7fee7" },
                            }}
                        >
                            <Remove />
                        </IconButton>

                        <Typography variant="h6" className="font-semibold text-gray-800">
                            {quantity}
                        </Typography>

                        <IconButton
                            onClick={increaseQty}
                            sx={{
                                border: "1px solid #84cc16",
                                color: "#84cc16",
                                "&:hover": { backgroundColor: "#f7fee7" },
                            }}
                        >
                            <Add />
                        </IconButton>
                    </div>

                    {/* Add to Cart */}
                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        sx={{
                            backgroundColor: "#eab308",
                            "&:hover": { backgroundColor: "#ca8a04" },
                            borderRadius: "9999px",
                            px: 4,
                            py: 1,
                            fontWeight: "600",
                            textTransform: "none",
                        }}
                    >
                        Add {quantity} to Cart
                    </Button>
                </CardContent>
            </Card>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, x: 100, y: -20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            y: 0,
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.85,
                            x: 80,
                            transition: { duration: 0.3 },
                        }}
                        className="fixed top-6 right-6 z-[9999] w-80  bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-lime-500 rounded-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start px-5 pt-4 pb-2">
                            <h3 className="flex items-center text-lime-700 font-semibold text-lg">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                    className="relative flex items-center justify-center mr-2"
                                >
                                    <span className="absolute w-6 h-6 bg-lime-400/40 rounded-full blur-md animate-pulse"></span>
                                    <CheckIcon
                                        sx={{
                                            color: "white",
                                            backgroundColor: "#65A30D",
                                            borderRadius: "6px",
                                            padding: "2px",
                                            boxShadow: "0 0 8px #65A30D80",
                                        }}
                                    />
                                </motion.div>
                                Product Added
                            </h3>

                            <IconButton
                                onClick={() => setShowToast(false)}
                                size="small"
                                sx={{
                                    color: "#9ca3af",
                                    transition: "color 0.2s ease",
                                    "&:hover": { color: "#ef4444" },
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </IconButton>
                        </div>

                        {/* Body */}
                        <div className="px-5 pb-3">
                            <p className="text-gray-700  text-sm mb-2">
                                Product successfully added to your cart.
                            </p>

                            <Link
                                to="/cart"
                                className="text-sm text-lime-500 font-medium hover:underline hover:underline-offset-4 transition-all duration-200"
                            >
                                View Cart & Checkout →
                            </Link>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-lime-100 rounded-full mx-5 mb-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{
                                    ease: "easeInOut",
                                    duration: 0.5,
                                }}
                                className="h-full bg-gradient-to-r from-lime-500 to-lime-400"
                                style={{
                                    boxShadow: "0 0 10px #65A30D80",
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
}
