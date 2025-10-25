import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import products from "../products/products.json";

const featuredProducts = products.filter((prod) => prod.featured === true);

const categories = [
    { name: "All", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeFMDS3d9FlbCeTyjigzCEPkp1pluR669qA&s" },
    { name: "Home & Office", img: "https://akns-images.eonline.com/eol_images/Entire_Site/2023011/rs_1024x759-230111070501-1024-Home-Office-Organization-LT-11123.jpg?fit=around%7C1024:759&output-quality=90&crop=1024:759;center,top" },
    { name: "Home & Living", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6FhkhtNNtLIwFTQn8R2QnoYC5FS9ik2Jrg&s" },
    { name: "Kitchen & Dining", img: "https://cdn11.bigcommerce.com/s-uef2n19utq/images/stencil/1280x1280/products/129/403/Your_Shop_Kitchen_and_Dining_Essentials___80131.1674191685.jpg?c=2" },
    { name: "Electronics", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMBbUDlYFGyia-f4Eg1UwDOdiOasyGfqUmVQ&s" },
    { name: "Personal Care", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzdWd5ZwhjJD7JgohKgkhJd8QXWNoCYujfA&s" },
    { name: "Fashion & Accessories", img: "https://www.fluxmagazine.com/wp-content/smush-webp/2022/02/Fashion-Accessories-Web-1.jpg.webp" },
    { name: "Office Supplies", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWh55fnOfOwOM-nMQ9oWp23r6wR22CuNpZ9w&s" },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-lime-50 to-yellow-50">
            {/* Hero Section */}
            <section className="flex flex-col bg-yellow-200 md:flex-row items-center justify-between px-8 md:px-16 py-16">
                <div className="max-w-xl text-center md:text-left space-y-6">
                    <Typography variant="h3" className="font-extrabold text-lime-600 leading-tight">
                        Embrace the Beauty of Bamboo Living
                    </Typography>
                    <Typography variant="body1" className="text-gray-700">
                        Experience fashion and lifestyle products crafted from sustainable bamboo — gentle on you, kind to the Earth.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#84cc16",
                            "&:hover": { backgroundColor: "#65a30d" },
                            borderRadius: "9999px",
                            paddingX: 3,
                            paddingY: 1,
                            marginTop: 1,
                        }}
                    >
                        Shop Now
                    </Button>
                </div>
                <div className="mt-10 md:mt-0">
                    <img
                        src="https://cdn11.bigcommerce.com/s-g2q9po18ob/images/stencil/1280x1280/products/155/543/1869F0C8-6D31-4E48-B044-A22692064B4B__79153.1666577571.JPG?c=2"
                        alt="Eco fashion"
                        className="w-full max-w-md rounded-2xl shadow-lg"
                    />
                </div>
            </section>

            {/* Category Section */}
            <section className="px-8 md:px-16 py-10">
                <Typography variant="h5" className="font-bold text-lime-600 text-center mb-8 pb-4">
                    Shop by Category
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <Link key={index} to={cat.name === "All" ? "/products" : `/products/${cat.name}`}>
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <Typography className="text-white" sx={{fontSize:20}}>
                                    {cat.name}
                                </Typography>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-lime-100 py-12 text-center mt-10">
                <Typography variant="h4" className="font-extrabold text-lime-700 mb-2">
                    Go Green, Spend Less!
                </Typography>
                <Typography variant="body1" className="text-gray-700 mb-4">
                    Your favorite bamboo-made pieces are up to 30% off — shop sustainable, live better.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#eab308",
                        "&:hover": { backgroundColor: "#ca8a04" },
                        borderRadius: "9999px",
                        paddingX: 3,
                        marginTop: 1,
                    }}
                >
                    Shop Deals
                </Button>
            </section>

            {/* Featured Products */}
            <section className="px-8 md:px-16 py-16">
                <Typography variant="h4" className="font-bold text-lime-600 text-center mb-8 pb-4">
                    Featured Products
                </Typography>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Card
                                className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                                sx={{ backgroundColor: "#fefce8" }}
                            >
                                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
                                    <CardMedia
                                        component="img"
                                        image={product.image1}
                                        alt={product.name}
                                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                                <CardContent>
                                    <Typography variant="h6" className="font-semibold text-lime-600">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-600 mb-4">
                                        {product.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            backgroundColor: "#eab308",
                                            "&:hover": { backgroundColor: "#ca8a04" },
                                            borderRadius: "9999px",
                                            marginY: 1,
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
