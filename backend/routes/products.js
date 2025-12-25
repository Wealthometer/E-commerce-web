import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Get all products with filters and sorting
router.get("/", async (req, res) => {
  try {
    const { category, sortBy, page = 1, limit = 12 } = req.query
    const filter = {}

    if (category) {
      filter.category = category
    }

    let query = Product.find(filter)

    // Sorting
    if (sortBy === "price-low") {
      query = query.sort({ price: 1 })
    } else if (sortBy === "price-high") {
      query = query.sort({ price: -1 })
    } else if (sortBy === "newest") {
      query = query.sort({ createdAt: -1 })
    } else if (sortBy === "popularity") {
      query = query.sort({ rating: -1 })
    }

    const skip = (page - 1) * limit
    const products = await query.skip(skip).limit(Number.parseInt(limit))
    const total = await Product.countDocuments(filter)

    res.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number.parseInt(page),
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews.user")
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
