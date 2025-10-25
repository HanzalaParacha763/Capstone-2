import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Card, CardContent, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { clearCart } from "../store/slices/cartList";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [orderPlaced, setOrderPlaced] = useState(false);

    const onSubmit = (data) => {
        if (items.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        console.log("Order placed:", { shipping: data, items, total });
        setOrderPlaced(true);
        setShowToast(true);
        reset();

        // ✅ Animate the progress bar for 3 seconds
        setProgress(0);
        let duration = 3000;
        let step = 100 / (duration / 50); // update every 50ms
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShowToast(false);
                        setOrderPlaced(false);
                        dispatch(clearCart());
                        navigate("/products"); // redirect after success
                    }, 300);
                    return 100;
                }
                return prev + step;
            });
        }, 50);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-50 to-yellow-200 py-12 px-6 flex flex-col md:flex-row md:justify-center md:space-x-10 relative">

            {/* ✅ Shipping Form */}
            <div className="w-full md:w-1/2 lg:w-2/5">
                <Card className="shadow-xl border border-yellow-200 rounded-2xl">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-semibold mb-6 text-yellow-800">Shipping Details</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                            <div className="flex space-x-4">
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
                                    mt: 2,
                                    backgroundColor: "#D4A017",
                                    "&:hover": { backgroundColor: "#C48F0B" },
                                    fontWeight: "bold",
                                    borderRadius: "12px",
                                    py: 1.5,
                                }}
                            >
                                Place Order
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* ✅ Order Summary */}
            <div className="w-full md:w-1/2 lg:w-1/3 mt-10 md:mt-0">
                <Card className="shadow-xl border border-yellow-200 rounded-2xl">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-semibold mb-6 text-yellow-800">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1 ml-4">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">x{item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-yellow-800">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Divider className="my-4" />

                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Tax (10%):</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg mt-2 text-yellow-900">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ✅ Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4 }}
                        className="fixed top-6 right-6 bg-white shadow-xl rounded-lg px-5 py-3 border-l-4 border-yellow-500 z-[9999] w-72"
                    >
                        <h3 className="text-yellow-700 font-semibold text-lg">Order Placed ✅</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Your order has been successfully placed.
                        </p>
                        <div className="h-1 bg-yellow-200 mt-3 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-600 transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Checkout;
