import { ProductReview } from "../models/product-review.js";
import { EntityManager } from "@mikro-orm/core";

export default class ProductReviewService {
  protected readonly manager_: EntityManager;

  constructor({ manager }: { manager: EntityManager }) {
    this.manager_ = manager;
  }

  async create(data: {
    product_id: string;
    customer_id: string;
    rating: number;
    content: string;
  }): Promise<ProductReview> {
    if (data.rating < 1 || data.rating > 5) {
      throw new Error("Rating must be between 1 and 5.")
    }

    const now = new Date();
    const reviewData = {
      ...data,
      created_at: now,
      updated_at: now,
    };

    const review = this.manager_.create(ProductReview, reviewData);
    await this.manager_.persistAndFlush(review);
    return review;
  }

  async list(selector: Record<string, unknown>): Promise<ProductReview[]> {
    return await this.manager_.find(ProductReview, selector);
  }

  async listByProduct(productId: string): Promise<ProductReview[]> {
    return await this.manager_.find(ProductReview, { product_id: productId }, {
      orderBy: { created_at: 'DESC' }
    });
  }
}