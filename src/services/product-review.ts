// src/services/product-review.ts
import { TransactionBaseService } from "@medusajs/medusa"
import { ProductReview } from "../models/product-review"

class ProductReviewService extends TransactionBaseService {
  async listByProduct(productId: string) {
    const reviewRepo = this.activeManager_.getRepository(ProductReview)
    return await reviewRepo.find({
      where: { product_id: productId },
      order: { created_at: "DESC" },
    })
  }

  async create(
    productId: string,
    customerId: string,
    rating: number,
    content: string
  ) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5.")
    }

    const reviewRepo = this.activeManager_.getRepository(ProductReview)
    const newReview = reviewRepo.create({
      product_id: productId,
      customer_id: customerId,
      rating,
      content,
    })

    return await reviewRepo.save(newReview)
  }
}

export default ProductReviewService