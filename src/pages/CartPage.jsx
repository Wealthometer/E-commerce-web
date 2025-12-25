"use client"

import { Link } from "react-router-dom"
import "./CartPage.css"

function CartPage({ cart, removeFromCart, updateCartQuantity }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" className="continue-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.images?.[0] || "/placeholder.svg?height=100&width=100&query=pet product"}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateCartQuantity(item._id, item.quantity - 1)}>−</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item._id, Number.parseInt(e.target.value) || 1)}
                  />
                  <button onClick={() => updateCartQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
