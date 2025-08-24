import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import ProductReviewService from "../../../services/product-review"

// GET /store/products/{id}/reviews
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const reviewService = req.scope.resolve<ProductReviewService>("productReviewService")
  const reviews = await reviewService.listByProduct(id)
  res.json({ reviews })
}

// POST /store/products/{id}/reviews
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  if (!req.auth?.actor_id) { // Note: req.auth can be optional
    return res.status(401).json({ message: "Not authorized" })
  }

  const { id } = req.params
  const { rating, content } = req.body as { rating: number; content: string }

  const reviewService = req.scope.resolve<ProductReviewService>("productReviewService")
  const review = await reviewService.create(id, req.auth.actor_id, rating, content)

  res.status(201).json({ review })
}