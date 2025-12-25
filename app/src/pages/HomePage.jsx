"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./HomePage.css"

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?featured=true&limit=8`)
      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Best Destination For</h1>
          <h2>Your Pets</h2>
          <Link to="/products" className="hero-btn">
            Explore Now
          </Link>
        </div>
        <div className="hero-image">
          <img src="/happy-dog-with-toy.jpg" alt="Happy pet" />
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="category-card">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 2L30 18H46L33 28L39 44L24 34L9 44L15 28L2 18H18L24 2Z" fill="#c97a5c" />
          </svg>
          <p>Pet Clothing</p>
        </div>
        <div className="category-card">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" fill="#c97a5c" />
          </svg>
          <p>Pet Foodies</p>
        </div>
        <div className="category-card">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="8" width="32" height="32" fill="#c97a5c" />
          </svg>
          <p>Accessories</p>
        </div>
        <div className="category-card">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4L28 14H38L30 20L34 30L24 24L14 30L18 20L10 14H20L24 4Z" fill="#c97a5c" />
          </svg>
          <p>Pet Toys</p>
        </div>
        <div className="category-card">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 2C13 2 4 11 4 22V44H44V22C44 11 35 2 24 2Z" fill="#c97a5c" />
          </svg>
          <p>Pet Care</p>
        </div>
      </section>

      {/* Pet Clothing Section */}
      <section className="products-section">
        <div className="section-header">
          <h2>Pet Clothing</h2>
          <Link to="/products?category=Pet Clothing" className="see-all">
            See all →
          </Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            products.slice(0, 4).map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} className="product-card">
                <div className="product-image">
                  <img
                    src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=pet product"}
                    alt={product.name}
                  />
                </div>
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo">
        <div className="promo-content">
          <h2>Clearance Sale !!!</h2>
          <Link to="/products" className="promo-btn">
            Shop Now
          </Link>
        </div>
        <div className="promo-image">
          <img src="/cute-small-dog-in-red-jacket.jpg" alt="Sale promo" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonial-card">
          <p>
            "At the core of our practice is the idea that clients are the most important achievement, and the best hope
            for a sustainable future."
          </p>
          <p className="author">- Happy Pet Owner</p>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="products-section">
        <div className="section-header">
          <h2>Best Selling Products</h2>
          <Link to="/products" className="see-all">
            See all →
          </Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            products.slice(4, 8).map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} className="product-card">
                <div className="product-image">
                  <img
                    src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=pet product"}
                    alt={product.name}
                  />
                </div>
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
