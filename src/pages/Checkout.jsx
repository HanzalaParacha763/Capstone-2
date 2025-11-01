import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { motion } from "framer-motion"
import { toast } from "react-toastify";

import { TextField, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";
import { useForm } from "react-hook-form";
import { clearCart } from "../store/slices/cartList";


const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalAmount } = useSelector((state) => state.cart);

    const subtotal = totalAmount;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = () => {
        reset();

        toast.success("Order placed successfully!", {
            icon: "🎉",
            style: {
                borderRadius: "12px",
                background: "#fff",
                color: "#166534",
                border: "1px solid #84cc16",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                fontWeight: 500,
            },
            progressStyle: {
                background: "linear-gradient(to right, #84cc16, #bef264)",
            },
        });

        dispatch(clearCart());
        setTimeout(() => navigate("/products"), 3000);
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
                        <Typography
                            variant="h5"
                            className="font-bold text-lime-700 pb-6 flex items-center gap-2"
                        >
                            Shipping Details
                            <Tooltip 
                                title="Enter your shipping details carefully for smooth delivery
                                Card Payments are not availabe currently!" arrow>
                                <HelpOutlineIcon
                                    fontSize="small"
                                    className="text-lime-700 p-[2px] cursor-pointer"
                                />
                            </Tooltip>
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
        </div>
    );
};

export default Checkout;
