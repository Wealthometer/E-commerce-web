import express from "express"
import protect from "../middleware/auth.js"

const router = express.Router()

// Note: Cart is typically managed on the frontend with localStorage
// This route can handle persistent server-side cart if needed in the future
// For now, frontend will manage cart state

router.get("/", protect, (req, res) => {
  res.json({ message: "Cart managed on frontend" })
})

export default router
