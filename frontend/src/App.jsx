import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatBot from "./components/ChatBot";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHome from "./pages/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import PlantScannerPage from "./pages/PlantScannerPage";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants"
          element={
            <ProtectedRoute>
              <Plants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/scan" element={<PlantScannerPage />} />

      </Routes>
      

      <Footer />
      <ChatBot />
    </AuthProvider>
  );
}