import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Slider,
    FormControl,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
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

    // Extract search query from URL (optional)
    const searchParams = new URLSearchParams(location.search);
    const initialSearch = searchParams.get("search")?.toLowerCase().trim() || "";

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 150]);
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // ✅ Sync category with URL
    useEffect(() => {
        if (category && categories.includes(category)) {
            setSelectedCategory(category);
        } else {
            setSelectedCategory("All");
        }
    }, [category]);

    const handlePriceChange = (_, newValue) => setPriceRange(newValue);

    // ✅ Filtering logic (includes search)
    const filteredProducts = products.filter((product) => {
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-lime-50 px-4 sm:px-8 lg:px-16 py-12">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Filter */}
                <div className="lg:w-1/6 w-full">
                    <div className="mb-8 flex justify-center">
                        <TextField
                            label="Search Products"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                            sx={{
                                maxWidth: 500,
                                backgroundColor: "white",
                                borderRadius: "12px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiInputLabel-root": {
                                    color: "#4b5563",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#d1d5db",
                                },
                            }}
                        />
                    </div>
                    <div className="lg:sticky lg:top-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 space-y-8">
                        {/* Category Filter */}
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

                        {/* Price Range Filter */}
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

                        {/* Reset Filters */}
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
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    {/* ✅ Search Bar */}
                    

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                            {filteredProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    onClick={() =>
                                        navigate(`/product/${product.id}`, {
                                            state: { product },
                                        })
                                    }
                                    className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-lime-50 border border-lime-100 cursor-pointer"
                                >
                                    <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
                                        <CardMedia
                                            component="img"
                                            image={product.image1}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    <CardContent className="flex flex-col items-center justify-between text-center p-5">
                                        <div>
                                            <Typography
                                                variant="h6"
                                                className="font-semibold text-lime-700 mb-1 truncate"
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="text-gray-600 mb-3 text-sm"
                                            >
                                                {product.price}
                                            </Typography>
                                        </div>

                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#eab308",
                                                "&:hover": {
                                                    backgroundColor: "#ca8a04",
                                                },
                                                borderRadius: "9999px",
                                                paddingX: 3,
                                                paddingY: 0.8,
                                                fontWeight: "600",
                                                textTransform: "none",
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Typography
                            variant="h6"
                            className="text-center text-gray-500 mt-16 italic"
                        >
                            No products found matching your filters.
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    );
}
