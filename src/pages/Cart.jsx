import { Button, Typography, IconButton, Divider } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decreaseQuantity, removeItem, clearCart } from "../store/slices/cartList";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Get cart data from Redux store
    const { items, totalAmount } = useSelector((state) => state.cart);

    const handleIncrease = (item) => {
        dispatch(addItem({ ...item })); // adds one more of same item
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id)); // decreases quantity by 1
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id)); // removes entire item
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-lime-50 to-yellow-50 text-center px-6">
                <Typography variant="h4" className="font-bold text-lime-700 mb-4">
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
                    }}
                    onClick={() => navigate("/products")}
                >
                    Back to Shop
                </Button>
            </div>
        );
    }

    const shipping = 4.99;
    const totalPrice = totalAmount.toFixed(2);
    const grandTotal = (totalAmount + shipping).toFixed(2);

    return (
        <div className="min-h-screen bg-gradient-to-b from-lime-50 to-yellow-50 px-6 sm:px-12 lg:px-24 py-12">
            <Typography
                variant="h4"
                className="font-extrabold text-lime-700 text-center mb-12"
            >
                Your Shopping Cart
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* 🧾 Cart Items */}
                <div className="lg:col-span-2 bg-white/60 rounded-2xl shadow-lg p-6 space-y-6 border border-lime-100">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gray-200 pb-6"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 rounded-xl object-cover shadow-sm"
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
                                <IconButton
                                    onClick={() => handleDecrease(item.id)}
                                    size="small"
                                >
                                    <Remove fontSize="small" />
                                </IconButton>
                                <Typography variant="body1" className="font-semibold text-gray-700">
                                    {item.quantity}
                                </Typography>
                                <IconButton
                                    onClick={() => handleIncrease(item)}
                                    size="small"
                                >
                                    <Add fontSize="small" />
                                </IconButton>
                            </div>

                            <Typography
                                variant="body1"
                                className="font-bold text-lime-700 min-w-[80px] text-right"
                            >
                                ${(item.totalPrice).toFixed(2)}
                            </Typography>

                            <IconButton
                                onClick={() => handleRemove(item.id)}
                                color="error"
                                size="small"
                            >
                                <Delete />
                            </IconButton>
                        </div>
                    ))}
                </div>

                {/* 💵 Summary Section */}
                <div className="bg-white/70 rounded-2xl shadow-lg p-6 border border-yellow-100 h-fit sticky top-10">
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
                </div>
            </div>
        </div>
    );
}
