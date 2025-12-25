import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>WARGSY</h3>
          <p>Your trusted destination for all your pet needs.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/products">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blog">Blog</Link>
        </div>

        <div className="footer-section">
          <h4>Help Center</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Get 20% off on your first purchase</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 WARGSY Pet Shop. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
