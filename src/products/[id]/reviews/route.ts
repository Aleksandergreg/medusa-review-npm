// src/api/store/products/[id]/reviews/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/types"
import ProductReviewService from "../../../services/product-review.js"

// GET /store/products/{id}/reviews
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const reviewService = req.scope.resolve<ProductReviewService>("productReviewService")
  const reviews = await reviewService.listByProduct(id)
  res.json({ reviews })
}

// POST /store/products/{id}/reviews
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // You would add validation here to ensure the user is logged in
  if (!req.auth.actor_id) {
    return res.status(401).json({ message: "Not authorized" })
  }

  const { id } = req.params
  const { rating, content } = req.body as { rating: number; content: string }
  
  const reviewService = req.scope.resolve<ProductReviewService>("productReviewService")
  const review = await reviewService.create(id, req.auth.actor_id, rating, content)
  
  res.status(201).json({ review })
}