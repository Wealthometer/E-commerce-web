"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./ProductDetailsPage.css"

function ProductDetailsPage({ addToCart, addToWishlist, wishlist, removeFromWishlist }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      const data = await response.json()
      setProduct(data)
    } catch (err) {
      console.error("Error fetching product:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    )
  if (!product)
    return (
      <div className="container">
        <p>Product not found</p>
      </div>
    )

  const isInWishlist = wishlist.some((item) => item._id === product._id)

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="breadcrumb">
          <button onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="product-details">
          <div className="product-gallery">
            <img
              src={product.images?.[0] || "/placeholder.svg?height=500&width=500&query=pet product"}
              alt={product.name}
              className="main-image"
            />
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>

            <div className="rating">
              <span className="stars">★ ★ ★ ★ ★</span>
              <span className="rating-text">({product.reviews?.length || 0} reviews)</span>
            </div>

            <div className="price-section">
              <span className="price">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
            </div>

            <p className="stock-status">{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>

            <p className="description">{product.description}</p>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
                className="btn-add-to-cart"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  if (isInWishlist) {
                    removeFromWishlist(product._id)
                  } else {
                    addToWishlist(product)
                  }
                }}
                className={`btn-wishlist ${isInWishlist ? "active" : ""}`}
              >
                ♥ Wishlist
              </button>
            </div>

            <div className="product-details-info">
              <div className="info-item">
                <h4>Category</h4>
                <p>{product.category}</p>
              </div>
              <div className="info-item">
                <h4>Stock</h4>
                <p>{product.stock} items available</p>
              </div>
            </div>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="reviews-list">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user?.name || "Anonymous"}</span>
                    <span className="review-rating">★ {review.rating}/5</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailsPage
