import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
    Typography,
    Button,
    Slider,
    FormControl,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";

import ProductCard from "../components/ProductCard";
import products from "../products/products.json";

const categories = [
    "All",
    "Home & Office",
    "Home & Living",
    "Kitchen & Dining",
    "Electronics",
    "Personal Care",
    "Fashion & Accessories",
    "Office Supplies",
];

export default function Products() {
    const location = useLocation();
    const navigate = useNavigate();
    const { category } = useParams();

    const searchParams = new URLSearchParams(location.search);
    const initialSearch = searchParams.get("search")?.toLowerCase().trim() || "";

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 150]);
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // Syncing Catefory from URL params
    useEffect(() => {
        if (category && categories.includes(category)) {
            setSelectedCategory(category);
        } else {
            setSelectedCategory("All");
        }
    }, [category]);

    const handlePriceChange = (_, newValue) => setPriceRange(newValue);

    // Filtered products memoized to prevent re-renders from re-triggering animations
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const numericPrice = parseFloat(product.price.replace("$", "")) || 0;
            const inCategory =
                selectedCategory === "All" ||
                product.category.toLowerCase() === selectedCategory.toLowerCase();
            const inPriceRange =
                numericPrice >= priceRange[0] && numericPrice <= priceRange[1];
            const matchesSearch =
                !searchTerm ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase());
            return inCategory && inPriceRange && matchesSearch;
        });
    }, [selectedCategory, priceRange, searchTerm]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-yellow-50 to-white px-6 sm:px-10 lg:px-16 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col lg:flex-row gap-10"
            >
                {/* Search & Filter*/}
                <motion.aside
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="lg:w-1/5 w-full"
                >
                    <div className="lg:sticky lg:top-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-8 border border-lime-100">
                        {/* Search field of the navbar blocked on this page */}
                        <TextField
                            label="Search Products"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "12px",
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                                "& .MuiInputLabel-root": { color: "#4b5563" },
                            }}
                        />

                        {/* Category filter */}
                        <div>
                            <Typography className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                                Category
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedCategory(value);
                                        navigate(
                                            value === "All"
                                                ? "/products"
                                                : `/products/${encodeURIComponent(value)}`
                                        );
                                    }}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        {/* Price Range */}
                        <div>
                            <Typography className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                                Price Range
                            </Typography>
                            <Typography className="text-gray-600 mb-1 text-sm">
                                ${priceRange[0]} - ${priceRange[1]}
                            </Typography>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={150}
                                step={5}
                                sx={{
                                    color: "#84cc16",
                                    "& .MuiSlider-thumb": { borderRadius: "4px" },
                                }}
                            />
                        </div>

                        {/* Reset */}
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setSelectedCategory("All");
                                setPriceRange([0, 150]);
                                setSearchTerm("");
                                navigate("/products");
                            }}
                            sx={{
                                borderColor: "#84cc16",
                                color: "#84cc16",
                                "&:hover": {
                                    borderColor: "#65a30d",
                                    backgroundColor: "#ecfccb",
                                },
                                borderRadius: "9999px",
                                px: 3,
                                py: 0.8,
                                fontWeight: "600",
                                textTransform: "none",
                            }}
                            fullWidth
                        >
                            Reset Filters
                        </Button>
                    </div>
                </motion.aside>

                {/* Products Grid */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    className="flex-1"
                >
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center mt-16"
                        >
                            <Typography
                                variant="h6"
                                className="text-gray-500 text-center italic mb-4"
                            >
                                No products found matching your filters.
                            </Typography>
                            <Button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                    setPriceRange([0, 150]);
                                }}
                                sx={{
                                    backgroundColor: "#84cc16",
                                    "&:hover": { backgroundColor: "#65a30d" },
                                    color: "white",
                                    borderRadius: "9999px",
                                    px: 3,
                                    py: 0.8,
                                    textTransform: "none",
                                }}
                            >
                                Reset Search
                            </Button>
                        </motion.div>
                    )}
                </motion.section>
            </motion.div>
        </div>
    );
}
