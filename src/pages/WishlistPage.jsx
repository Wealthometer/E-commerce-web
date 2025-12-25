"use client"

import { Link } from "react-router-dom"
import "./WishlistPage.css"

function WishlistPage({ wishlist, removeFromWishlist, addToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <h1>My Wishlist</h1>
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <Link to="/products" className="continue-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>My Wishlist</h1>

        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product._id} className="wishlist-item">
              <Link to={`/products/${product._id}`} className="product-link">
                <div className="product-image">
                  <img
                    src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=pet product"}
                    alt={product.name}
                  />
                </div>
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
              </Link>
              <div className="wishlist-actions">
                <button onClick={() => addToCart(product)} className="btn-add-cart">
                  Add to Cart
                </button>
                <button onClick={() => removeFromWishlist(product._id)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
