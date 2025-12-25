import express from "express"
import protect from "../middleware/auth.js"
import Order from "../models/Order.js"
import User from "../models/User.js"

const router = express.Router()

// Create order
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const order = new Order({
      user: req.userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    })

    await order.save()
    user.orders.push(order._id)
    await user.save()

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get user orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("items.product")
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get order by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product").populate("user")

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    // Check if user owns this order
    if (order.user._id.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized" })
    }

    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
