import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import ProductReviewService from "../../../../../services/product-review";

interface AuthenticatedRequest extends MedusaRequest {
  actor_context: {
    actor_id: string;
  };
}

// This GET function is for anyone, so it uses the standard MedusaRequest
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const reviewService = req.scope.resolve<ProductReviewService>("productReviewService")
  const reviews = await reviewService.listByProduct(id)
  res.json({ reviews })
}

export async function POST(req: AuthenticatedRequest, res: MedusaResponse) {
  if (!req.actor_context?.actor_id) {
    return res.status(401).json({ message: "Not authorized" })
  }

  const { id } = req.params
  const { rating, content } = req.body as { rating: number; content: string }

  const reviewService = req.scope.resolve<ProductReviewService>("productReviewService")
  const review = await reviewService.create(id, req.actor_context.actor_id, rating, content)

  res.status(201).json({ review })
}