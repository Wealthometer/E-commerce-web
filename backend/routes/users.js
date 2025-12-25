import express from "express"
import protect from "../middleware/auth.js"
import User from "../models/User.js"

const router = express.Router()

// Get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password").populate("wishlist").populate("orders")
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, phone, address } = req.body
    const user = await User.findByIdAndUpdate(req.userId, { name, phone, address }, { new: true }).select("-password")
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add to wishlist
router.post("/wishlist/:productId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId)
      await user.save()
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Remove from wishlist
router.delete("/wishlist/:productId", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, { $pull: { wishlist: req.params.productId } }, { new: true })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
