"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./Navbar.css"

function Navbar({ user, setUser, cartCount }) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    navigate("/")
  }

  return (
    <nav className="navbar bg-white border-b border-gray-200">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">WARGSY</span>
        </Link>

        <div className="navbar-search">
          <input type="text" placeholder="Search pets, foods, accessories..." className="search-input" />
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 19L14.65 14.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="navbar-menu">
          <Link to="/products?category=Pets" className="nav-link">
            Pets
          </Link>
          <Link to="/products?category=Pet Clothing" className="nav-link">
            Clothing
          </Link>
          <Link to="/products?category=Pet Foodies" className="nav-link">
            Foodies
          </Link>
          <Link to="/products" className="nav-link">
            All Products
          </Link>
        </div>

        <div className="navbar-icons">
          <Link to="/wishlist" className="nav-icon" title="Wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </Link>

          <Link to="/cart" className="nav-icon cart-icon" title="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 2L6 6H3C1.9 6 1 6.9 1 8V18C1 19.1 1.9 20 3 20H19C20.1 20 21 19.1 21 18V8C21 6.9 20.1 6 19 6H16L13 2H9Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <button className="user-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {user.name.charAt(0).toUpperCase()}
              </button>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-link">
                    Profile
                  </Link>
                  <Link to="/orders" className="dropdown-link">
                    Orders
                  </Link>
                  <button onClick={handleLogout} className="dropdown-link logout">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link auth-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
