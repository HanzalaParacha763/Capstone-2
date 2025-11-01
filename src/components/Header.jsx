import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Badge,
    InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import logo from "../assets/logo.png";

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    // Cart items count 
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);


    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Products", path: "/products" },
    ];

    // Dynamic styles fro active Link
    const activeStyle = (path) =>
        location.pathname === path
            ? { color: "#65A30D", fontWeight: 700 }
            : { color: "#374151", "&:hover": { color: "#65A30D" } };


    // Redirects to products pafe with ?search query
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm("");
            if (drawerOpen) setDrawerOpen(false);
        }
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                color: "#000",
                borderBottom: "1px solid #e5e7eb",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: { xs: 2, md: 6 },
                }}
            >
                <Link to="/">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-24 md:w-28 hover:opacity-80 transition-opacity duration-200"
                            style={{ objectFit: "contain" }}
                        />
                        <Typography
                            sx={{
                                fontSize: { xs: 28, sm: 34, md: 40 },
                                color: "#65A30D",
                                fontWeight: 700,
                                fontFamily: "'Brush Script MT', cursive",
                                lineHeight: 1,
                                display: { xs: "none", md: "block" },
                            }}
                        >
                            Bamboo Bliss
                        </Typography>
                    </Box>
                </Link>

                {!isMobile && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>

                        <Box
                            component="form"
                            onSubmit={handleSearch}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#f3f4f6",
                                borderRadius: "12px",
                                px: 1.5,
                                py: 0.5,
                                width: "240px",
                            }}
                        >
                            <InputBase
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ flex: 1, fontSize: "0.95rem" }}
                            />
                            <IconButton type="submit" sx={{ color: "#65A30D" }}>
                                <SearchIcon />
                            </IconButton>
                        </Box>

                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} style={{ textDecoration: "none" }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        transition: "color 0.3s",
                                        ...activeStyle(link.path),
                                    }}
                                >
                                    {link.label}
                                </Typography>
                            </Link>
                        ))}

                        <Link to="/cart">
                            <Badge badgeContent={cartCount} color="success" overlap="circular">
                                <IconButton
                                    sx={{
                                        backgroundColor: "#65A30D",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#4d7c0f" },
                                        borderRadius: "12px",
                                    }}
                                >
                                    <CartIcon />
                                </IconButton>
                            </Badge>
                        </Link>
                    </Box>
                )}

                {/* Mobile Menu */}
                {isMobile && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Link to="/cart">
                            <Badge badgeContent={cartCount} color="success" overlap="circular">
                                <IconButton
                                    sx={{
                                        backgroundColor: "#65A30D",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#4d7c0f" },
                                        borderRadius: "12px",
                                    }}
                                >
                                    <CartIcon />
                                </IconButton>
                            </Badge>
                        </Link>

                        <IconButton aria-label="open menu" onClick={() => setDrawerOpen(true)} sx={{ color: "#65A30D" }}>
                            <MenuIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: 260, backgroundColor: "#f9fafb" },
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                            py: 1.5,
                            borderBottom: "1px solid #e5e7eb",
                        }}
                    >
                        <Typography sx={{ fontWeight: 700, color: "#374151" }}>Menu</Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Search in Drawer */}
                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "10px",
                            mx: 2,
                            my: 2,
                            px: 1.5,
                        }}
                    >
                        <InputBase
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ flex: 1, fontSize: "0.9rem" }}
                        />
                        <IconButton type="submit" sx={{ color: "#65A30D" }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 2 }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setDrawerOpen(false)}
                                style={{ textDecoration: "none" }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        px: 1,
                                        py: 0.8,
                                        borderRadius: "8px",
                                        color:
                                            location.pathname === link.path ? "#65A30D" : "#374151",
                                        backgroundColor:
                                            location.pathname === link.path
                                                ? "#ecfccb"
                                                : "transparent",
                                        "&:hover": {
                                            backgroundColor: "#f1f5f9",
                                            color: "#65A30D",
                                        },
                                        transition: "all 0.3s",
                                    }}
                                >
                                    {link.label}
                                </Typography>
                            </Link>
                        ))}

                        <Link to="/cart" onClick={() => setDrawerOpen(false)}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#65A30D",
                                    "&:hover": { backgroundColor: "#4d7c0f" },
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: "10px",
                                    py: 1.2,
                                }}
                            >
                                <CartIcon sx={{ mr: 1 }} /> View Cart ({cartCount})
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Drawer>
        </AppBar>
    );
}
