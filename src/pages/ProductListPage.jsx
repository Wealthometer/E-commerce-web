"use client"

import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import "./ProductListPage.css"

function ProductListPage({ addToCart, addToWishlist, wishlist }) {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const category = searchParams.get("category") || ""

  useEffect(() => {
    fetchProducts()
  }, [category, sortBy, currentPage])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const url = new URL(`${import.meta.env.VITE_API_URL}/api/products`)
      if (category) url.searchParams.append("category", category)
      url.searchParams.append("sortBy", sortBy)
      url.searchParams.append("page", currentPage)
      url.searchParams.append("limit", 12)

      const response = await fetch(url)
      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-list-page">
      <div className="container">
        <div className="page-header">
          <h1>{category || "All Products"}</h1>
        </div>

        <div className="filters">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        {loading ? (
          <p className="loading">Loading products...</p>
        ) : (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
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
                  <div className="product-actions">
                    <button onClick={() => addToCart(product)} className="btn-add-cart">
                      Add to Cart
                    </button>
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`btn-wishlist ${wishlist.some((item) => item._id === product._id) ? "active" : ""}`}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && <p className="no-products">No products found</p>}

            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="page-btn"
              >
                Previous
              </button>
              <span className="page-info">Page {currentPage}</span>
              <button onClick={() => setCurrentPage(currentPage + 1)} className="page-btn">
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductListPage
