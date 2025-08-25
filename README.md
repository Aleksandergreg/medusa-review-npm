# Medusa Product Reviews Plugin

A simple and robust plugin for adding product review functionality to your Medusa V2 store. This plugin introduces a new data model for reviews and exposes Store API endpoints to create and list reviews for products.

---

## Prerequisites

-   A Medusa V2 backend. This plugin is not compatible with Medusa V1.

---

## Installation

1.  **Install the plugin** in your Medusa project's root directory:

    ```bash
    npm install medusa-plugin-reviews
    ```

2.  **Add the plugin** to your `medusa-config.ts` file. Ensure you include it in the `plugins` array:

    ```typescript
    // in medusa-config.ts
    import { defineConfig } from "@medusajs/framework"

    // ...

    export default defineConfig({
      // ...
      plugins: [
        // ... other plugins
        `medusa-plugin-reviews`
      ]
    })
    ```

3.  **Run the database migration** to add the `product_review` table to your database. From your project's root, run:

    ```bash
    npx medusa-dev db migrate
    ```

Your Medusa backend is now equipped with the product reviews functionality!

---

## Features

-   **`ProductReview` Entity**: Creates a new `product_review` table in your database to store review data.
-   **Service Layer**: Adds a `ProductReviewService` to handle the business logic for creating and retrieving reviews.
-   **Store API Endpoints**: Exposes two endpoints to interact with reviews from your storefront.

---

## API Endpoints

The plugin adds the following REST API endpoints to your Medusa store.

### 1. Get Product Reviews

Retrieves a list of all reviews for a specific product.

-   **Endpoint**: `GET /store/products/:id/reviews`
-   **URL Parameters**:
    -   `id` (string): The ID of the product.
-   **Success Response**: `200 OK`
-   **Payload**:
    ```json
    {
      "reviews": [
        {
          "id": "prodrev_01H8X...",
          "product_id": "prod_01H8X...",
          "customer_id": "cus_01H8X...",
          "rating": 5,
          "content": "This product is amazing!",
          "created_at": "2025-08-25T08:11:00.000Z",
          "updated_at": "2025-08-25T08:11:00.000Z"
        }
      ]
    }
    ```

### 2. Create a Product Review

Creates a new review for a specific product. This endpoint requires the customer to be authenticated.

-   **Endpoint**: `POST /store/products/:id/reviews`
-   **URL Parameters**:
    -   `id` (string): The ID of the product.
-   **Request Body**:
    ```json
    {
      "rating": 5,
      "content": "This is the best purchase I've ever made."
    }
    ```
-   **Success Response**: `200 OK`
-   **Payload**:
    ```json
    {
      "review": {
        "id": "prodrev_01H8Y...",
        "product_id": "prod_01H8X...",
        "customer_id": "cus_01H8X...",
        "rating": 5,
        "content": "This is the best purchase I've ever made.",
        "created_at": "2025-08-25T10:11:00.000Z",
        "updated_at": "2025-08-25T10:11:00.000Z"
      }
    }
    ```

---

## Data Model

This plugin introduces one new entity, `ProductReview`.

| Field         | Type     | Description                                |
| ------------- | -------- | ------------------------------------------ |
| `id`          | `string` | The unique identifier for the review.      |
| `product_id`  | `string` | The ID of the product being reviewed.      |
| `customer_id` | `string` | The ID of the customer who wrote the review. |
| `rating`      | `number` | The star rating given (e.g., 1-5).         |
| `content`     | `string` | The text content of the review.            |
| `created_at`  | `Date`   | The timestamp of when the review was created. |
| `updated_at`  | `Date`   | The timestamp of the last update.          |

---

## License

This plugin is licensed under the **MIT License**.