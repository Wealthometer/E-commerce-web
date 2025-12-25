"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ProductListPage from "./pages/ProductListPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import CheckoutPage from "./pages/CheckoutPage"
import OrdersPage from "./pages/OrdersPage"
import WishlistPage from "./pages/WishlistPage"
import "./styles/App.css"

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedToken = localStorage.getItem("token")
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item._id === product._id)
    let updatedCart

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item,
      )
    } else {
      updatedCart = [...cart, { ...product, quantity }]
    }

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      const updatedCart = cart.map((item) => (item._id === productId ? { ...item, quantity } : item))
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
    }
  }

  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id)
    if (!exists) {
      const updatedWishlist = [...wishlist, product]
      setWishlist(updatedWishlist)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    }
  }

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== productId)
    setWishlist(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar user={user} setUser={setUser} cartCount={cart.length} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={<ProductListPage addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} />}
            />
            <Route
              path="/products/:id"
              element={
                <ProductDetailsPage
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  wishlist={wishlist}
                  removeFromWishlist={removeFromWishlist}
                />
              }
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />}
            />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            <Route
              path="/profile"
              element={user ? <ProfilePage user={user} setUser={setUser} /> : <LoginPage setUser={setUser} />}
            />
            <Route
              path="/checkout"
              element={user ? <CheckoutPage cart={cart} user={user} /> : <LoginPage setUser={setUser} />}
            />
            <Route path="/orders" element={user ? <OrdersPage user={user} /> : <LoginPage setUser={setUser} />} />
            <Route
              path="/wishlist"
              element={
                <WishlistPage wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
