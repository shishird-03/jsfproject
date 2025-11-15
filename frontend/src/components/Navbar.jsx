import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <h1 className="logo">🌿 FloraConnect</h1>

      <nav>
        {!isLoggedIn && (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}

        {isLoggedIn && user?.role === "ADMIN" && (
          <>
            <Link to="/admin/home">Home</Link>
            <Link to="/admin/addproduct">Add Product</Link>
            <Link to="/admin/dashboard">Dashboard</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {isLoggedIn && user?.role === "CLIENT" && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/plants">Plants</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/scan">Scan Plant</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
