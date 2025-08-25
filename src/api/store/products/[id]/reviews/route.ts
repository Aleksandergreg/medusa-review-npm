import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import ProductReviewService from "../../../../../services/product-review.js";

interface AuthenticatedRequest extends MedusaRequest {
  actor_context?: {
    actor_id: string;
  };
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params;
  const reviewService =
    req.scope.resolve<ProductReviewService>("productReviewService");
  const reviews = await reviewService.listByProduct(id);
  res.json({ reviews });
};

export const POST = async (req: AuthenticatedRequest, res: MedusaResponse) => {
  const { id } = req.params;
  const { rating, content } = req.body as { rating: number; content: string };
  const reviewService =
    req.scope.resolve<ProductReviewService>("productReviewService");

  // Get the customer ID from actor context
  const customerId = req.actor_context?.actor_id;

  if (!customerId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to post a review." });
  }

  const review = await reviewService.create({
    product_id: id,
    customer_id: customerId,
    rating,
    content,
  });

  res.status(201).json({ review });
};