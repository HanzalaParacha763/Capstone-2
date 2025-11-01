import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    IconButton,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Add, Remove } from "@mui/icons-material";


import products from "../products/products.json";

import { addItem } from "../store/slices/cartList";

export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id));
    const dispatch = useDispatch();

    const [mainImage, setMainImage] = useState(product?.image1);
    const [quantity, setQuantity] = useState(1);

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


    const increaseQty = () => setQuantity((prev) => prev + 1);
    const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            dispatch(
                addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image1,
                })
            );
        }

        toast.success(`${quantity} x ${product.name} added to cart!`, {
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

                    {/* Quantity Selector */}
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
        </div>
    );
}
