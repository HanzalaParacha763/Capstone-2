import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../products/products.json";

const featuredProducts = products.filter((prod) => prod.featured);

const categories = [
  { name: "All", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeFMDS3d9FlbCeTyjigzCEPkp1pluR669qA&s" },
  { name: "Home & Office", img: "https://akns-images.eonline.com/eol_images/Entire_Site/2023011/rs_1024x759-230111070501-1024-Home-Office-Organization-LT-11123.jpg" },
  { name: "Home & Living", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6FhkhtNNtLIwFTQn8R2QnoYC5FS9ik2Jrg&s" },
  { name: "Kitchen & Dining", img: "https://cdn11.bigcommerce.com/s-uef2n19utq/images/stencil/1280x1280/products/129/403/Your_Shop_Kitchen_and_Dining_Essentials___80131.1674191685.jpg?c=2" },
  { name: "Electronics", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMBbUDlYFGyia-f4Eg1UwDOdiOasyGfqUmVQ&s" },
  { name: "Personal Care", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzdWd5ZwhjJD7JgohKgkhJd8QXWNoCYujfA&s" },
  { name: "Fashion & Accessories", img: "https://www.fluxmagazine.com/wp-content/smush-webp/2022/02/Fashion-Accessories-Web-1.jpg.webp" },
  { name: "Office Supplies", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWh55fnOfOwOM-nMQ9oWp23r6wR22CuNpZ9w&s" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-amber-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-lime-200"
      >
        <div className="max-w-xl text-center md:text-left">
          <Typography variant="h3" className="font-extrabold text-lime-700 leading-tight pb-2">
            Embrace the Beauty of Bamboo Living
          </Typography>
          <Typography variant="body1" className="text-gray-700 pb-2">
            Experience sustainable lifestyle products crafted from bamboo — elegant, durable, and eco-conscious.
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            sx={{
              backgroundColor: "#84cc16",
              "&:hover": { backgroundColor: "#65a30d" },
              borderRadius: "9999px",
              paddingX: 3,
              paddingY: 1.2,
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(132,204,22,0.4)",
            }}
          >
            Shop Now
          </Button>
        </div>
        <motion.div
          className="mt-10 md:mt-0 flex justify-center md:justify-end"
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <img
            src="https://cdn11.bigcommerce.com/s-g2q9po18ob/images/stencil/1280x1280/products/155/543/1869F0C8-6D31-4E48-B044-A22692064B4B__79153.1666577571.JPG?c=2"
            alt="Eco fashion"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </motion.div>
      </motion.section>

      {/* Category Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-6 md:px-16 py-14"
      >
        <Typography variant="h5" className="font-bold text-lime-700 text-center pb-10">
          Shop by Category
        </Typography>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link to={cat.name === "All" ? "/products" : `/products/${cat.name}`}>
                <div className="relative overflow-hidden rounded-xl shadow-md group">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Typography className="text-white font-semibold text-lg">
                      {cat.name}
                    </Typography>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-lime-100 py-14 shadow-inner flex flex-col items-center text-center px-6 md:px-16 mb-16 gap-4"
      >
        <Typography variant="h4" className="font-extrabold text-lime-700 mb-3">
          Go Green, Spend Less!
        </Typography>
        <Typography variant="body1" className="text-gray-700 mb-6 max-w-xl mx-auto">
          Your favorite bamboo-made essentials are up to 30% off — shop smart, live sustainably.
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            backgroundColor: "#eab308",
            "&:hover": { backgroundColor: "#ca8a04" },
            borderRadius: "9999px",
            paddingX: 3,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Shop Deals
        </Button>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-6 md:px-16 py-16"
      >
        <Typography variant="h4" className="font-bold text-lime-700 text-center pb-10">
          Featured Products
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                <Card
                  className="rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
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
                    <Typography variant="h6" className="font-semibold text-lime-700">
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
                        textTransform: "none",
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
