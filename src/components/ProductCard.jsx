import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, variant = "default" }) {
    const navigate = useNavigate();

    const handleClick = () => navigate(`/product/${product.id}`, { state: { product } });

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <Card
                onClick={handleClick}
                className={`rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer
          ${variant === "home" ? "bg-yellow-50" : "bg-white border border-lime-100"}`}
            >
                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
                    <CardMedia
                        component="img"
                        image={product.image1}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>

                <CardContent className="text-center">
                    <Typography variant="h6" className="font-semibold text-lime-700 truncate">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-3 text-sm">
                        {product.price}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: "#eab308",
                            "&:hover": { backgroundColor: "#ca8a04" },
                            borderRadius: "9999px",
                            textTransform: "none",
                            fontWeight: "bold",
                            mt: 1,
                        }}
                    >
                        View Details
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
