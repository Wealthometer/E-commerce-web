import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["Pet Clothing", "Pet Foodies", "Pet Accessories", "Pets"],
      required: true,
    },
    price: { type: Number, required: true },
    originalPrice: Number,
    stock: { type: Number, default: 0 },
    images: [String],
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.model("Product", productSchema)
