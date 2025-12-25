"use client"

import { useEffect, useState } from "react"
import "./OrdersPage.css"

function OrdersPage({ user }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setOrders(data)
    } catch (err) {
      console.error("Error fetching orders:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Your Orders</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order._id.slice(-8)}</span>
                  <span className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span>
                </div>
                <div className="order-details">
                  <div className="detail-row">
                    <span>Date:</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Total:</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Items:</span>
                    <span>{order.items.length} item(s)</span>
                  </div>
                  <div className="detail-row">
                    <span>Payment:</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                </div>
                <div className="order-items">
                  <h4>Items Ordered:</h4>
                  {order.items.map((item) => (
                    <div key={item._id} className="item-line">
                      <span>{item.product?.name || "Product"}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
