import { Button, Typography, IconButton, Divider } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decreaseQuantity, removeItem, clearCart } from "../store/slices/cartList";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items, totalAmount } = useSelector((state) => state.cart);

    const handleIncrease = (item) => dispatch(addItem({ ...item }));
    const handleDecrease = (id) => dispatch(decreaseQuantity(id));
    const handleRemove = (id) => dispatch(removeItem(id));

    const shipping = 4.99;
    const totalPrice = totalAmount.toFixed(2);
    const grandTotal = (totalAmount + shipping).toFixed(2);

    // ✨ Page transition
    const pageVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    if (items.length === 0) {
        return (
            <motion.div
                variants={pageVariants}
                initial="hidden"
                animate="show"
                className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-lime-50 to-yellow-50 text-center px-6"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" className="font-extrabold text-lime-700 mb-4">
                        Your Cart is Empty 🛍
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mb-8">
                        Looks like you haven’t added anything yet. Go find something you love!
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#eab308",
                            "&:hover": { backgroundColor: "#ca8a04" },
                            borderRadius: "9999px",
                            px: 4,
                            py: 1.2,
                            fontWeight: "600",
                            textTransform: "none",
                            boxShadow: "0 4px 14px rgba(202,138,4,0.25)",
                        }}
                        onClick={() => navigate("/products")}
                    >
                        Back to Shop
                    </Button>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="show"
            className="min-h-screen bg-gradient-to-b from-lime-50 to-yellow-50 px-6 sm:px-12 lg:px-24 py-12"
        >
            <Typography
                variant="h4"
                className="font-extrabold text-lime-700 text-center mb-12"
            >
                Your Shopping Cart
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 space-y-6 border border-lime-100">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gray-200 pb-6 hover:bg-lime-50/40 rounded-xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 rounded-xl object-cover shadow-sm hover:scale-105 transition-transform duration-300"
                                    />
                                    <div>
                                        <Typography
                                            variant="h6"
                                            className="text-lime-700 font-semibold"
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="text-gray-600 font-medium"
                                        >
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3">
                                    <IconButton onClick={() => handleDecrease(item.id)} size="small">
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <Typography variant="body1" className="font-semibold text-gray-700">
                                        {item.quantity}
                                    </Typography>
                                    <IconButton onClick={() => handleIncrease(item)} size="small">
                                        <Add fontSize="small" />
                                    </IconButton>
                                </div>

                                <Typography
                                    variant="body1"
                                    className="font-bold text-lime-700 min-w-[80px] text-right"
                                >
                                    ${(item.totalPrice).toFixed(2)}
                                </Typography>

                                <IconButton onClick={() => handleRemove(item.id)} color="error" size="small">
                                    <Delete />
                                </IconButton>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary Section */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-yellow-100 h-fit sticky top-10"
                >
                    <Typography variant="h6" className="font-bold text-lime-700 mb-6">
                        Order Summary
                    </Typography>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Typography variant="body1" className="text-gray-700">
                                Subtotal
                            </Typography>
                            <Typography variant="body1" className="font-semibold">
                                ${totalPrice}
                            </Typography>
                        </div>
                        <div className="flex justify-between">
                            <Typography variant="body1" className="text-gray-700">
                                Shipping
                            </Typography>
                            <Typography variant="body1" className="font-semibold">
                                ${shipping.toFixed(2)}
                            </Typography>
                        </div>
                        <Divider className="my-3" />
                        <div className="flex justify-between">
                            <Typography variant="h6" className="font-bold text-lime-700">
                                Total
                            </Typography>
                            <Typography variant="h6" className="font-bold text-lime-700">
                                ${grandTotal}
                            </Typography>
                        </div>
                    </div>

                    <Link to="/checkout">
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 4,
                                backgroundColor: "#eab308",
                                "&:hover": { backgroundColor: "#ca8a04" },
                                borderRadius: "9999px",
                                py: 1.4,
                                fontWeight: "600",
                                textTransform: "none",
                                boxShadow: "0 4px 14px rgba(202,138,4,0.25)",
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Link>

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 2,
                            borderColor: "#65a30d",
                            color: "#65a30d",
                            borderRadius: "9999px",
                            py: 1.2,
                            fontWeight: "600",
                            textTransform: "none",
                            "&:hover": { borderColor: "#4d7c0f", color: "#4d7c0f" },
                        }}
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping
                    </Button>

                    <Button
                        fullWidth
                        color="error"
                        variant="text"
                        sx={{
                            mt: 2,
                            fontWeight: "600",
                            textTransform: "none",
                        }}
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear Cart
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}
