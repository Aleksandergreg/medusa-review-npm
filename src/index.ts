import { ProductReview } from './models/product-review.js';
import ProductReviewService from './services/product-review.js';
import { ProductReviewCreate1755957549768 } from "./migrations/1755957549768-ProductReviewCreate.js";

export default {
  models: [ProductReview],
  services: [ProductReviewService],
  migrations: [ProductReviewCreate1755957549768],
};