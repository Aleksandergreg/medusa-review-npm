import {
  Entity,
  PrimaryKey,
  Property,
  OnInit,
} from "@mikro-orm/core";
import { generateEntityId } from "@medusajs/utils";

@Entity()
export class ProductReview {
  @PrimaryKey({ columnType: "text" })
  id!: string;

  @Property({ columnType: "text" })
  product_id!: string;

  @Property({ columnType: "text" })
  customer_id!: string;

  @Property({ columnType: "number" })
  rating!: number;

  @Property({ columnType: "text" })
  content!: string;

  @Property({
    onCreate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  created_at: Date = new Date();

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  updated_at: Date = new Date();

  @OnInit()
  onInit() {
    this.id = generateEntityId(this.id, "prodrev");
  }
}