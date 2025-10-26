import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { clearCart } from "../store/slices/cartList";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalAmount } = useSelector((state) => state.cart);

    const subtotal = totalAmount;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showToast, setShowToast] = useState(false);
    const [progress, setProgress] = useState(0);

    const onSubmit = (data) => {
        if (items.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        console.log("Order placed:", { shipping: data, items, total });
        setShowToast(true);
        reset();

        setProgress(0);
        let duration = 3000;
        let step = 100 / (duration / 50);
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShowToast(false);
                        dispatch(clearCart());
                        navigate("/products");
                    }, 300);
                    return 100;
                }
                return prev + step;
            });
        }, 50);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-lime-50 to-yellow-100 py-16 px-6 flex flex-col lg:flex-row justify-center gap-12 relative">

            {/* Shipping Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full lg:w-2/5"
            >
                <Card className="shadow-xl border border-yellow-200/60 rounded-3xl backdrop-blur-sm bg-white/80">
                    <CardContent className="p-8">
                        <Typography variant="h5" className="font-bold text-lime-700 pb-6">
                            Shipping Details
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <TextField
                                label="Full Name"
                                fullWidth
                                {...register("fullName", { required: "Full name is required" })}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />

                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />

                            <TextField
                                label="Phone Number"
                                fullWidth
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: { value: /^[0-9]{10,15}$/, message: "Enter a valid phone number" },
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />

                            <TextField
                                label="Address"
                                multiline
                                rows={2}
                                fullWidth
                                {...register("address", { required: "Address is required" })}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />

                            <div className="flex gap-4">
                                <TextField
                                    label="City"
                                    fullWidth
                                    {...register("city", { required: "City is required" })}
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                />

                                <TextField
                                    label="Postal Code"
                                    fullWidth
                                    {...register("postalCode", { required: "Postal code is required" })}
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode?.message}
                                />
                            </div>

                            <TextField
                                label="Country"
                                fullWidth
                                {...register("country", { required: "Country is required" })}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    backgroundColor: "#eab308",
                                    "&:hover": { backgroundColor: "#ca8a04" },
                                    fontWeight: "600",
                                    borderRadius: "9999px",
                                    py: 1.4,
                                    textTransform: "none",
                                }}
                            >
                                Place Order
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="w-full lg:w-1/3"
            >
                <Card className="shadow-xl border border-lime-200/70 rounded-3xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                        <Typography variant="h5" className="font-bold text-lime-700 mb-6">
                            Order Summary
                        </Typography>

                        {items.length > 0 ? (
                            <div className="space-y-5 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-xl object-cover shadow-sm"
                                        />
                                        <div className="flex-1 ml-4">
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">x{item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-lime-700">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Typography className="text-center text-gray-500 italic mb-6">
                                Your cart is empty.
                            </Typography>
                        )}

                        <Divider className="my-4" />

                        <div className="flex justify-between text-gray-700 mb-1">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 mb-1">
                            <span>Tax (10%):</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-lime-700 mt-2">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 100 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            transition: { type: "spring", stiffness: 200, damping: 18 },
                        }}
                        exit={{ opacity: 0, scale: 0.95, x: 100, transition: { duration: 0.3 } }}
                        className="fixed top-6 right-6 z-[9999] w-80 bg-white/90 backdrop-blur-md border border-yellow-300/50 shadow-xl rounded-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-5 py-3">
                            <div className="relative mr-3">
                                <span className="absolute w-6 h-6 bg-yellow-300/40 rounded-full blur-md animate-pulse"></span>
                                <CheckIcon
                                    sx={{
                                        color: "white",
                                        backgroundColor: "#eab308",
                                        borderRadius: "6px",
                                        padding: "3px",
                                        boxShadow: "0 0 10px #EAB30890",
                                    }}
                                />
                            </div>
                            <Typography className="font-semibold text-yellow-700 text-lg">
                                Order Placed Successfully
                            </Typography>
                        </div>

                        <div className="px-5 pb-3">
                            <p className="text-gray-700 text-sm">
                                Thank you for shopping with us! Redirecting...
                            </p>
                        </div>

                        <div className="h-1 bg-yellow-100 mx-5 mb-4 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeInOut", duration: 0.4 }}
                                className="h-full bg-gradient-to-r from-yellow-500 to-amber-400"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Checkout;
