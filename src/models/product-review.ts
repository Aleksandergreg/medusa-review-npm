import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
  } from "typeorm"
  // CHANGE: Import Product from the new package
  import { Product } from "@medusajs/product/dist/models"
  import { generateEntityId } from "@medusajs/utils"
  
  @Entity()
  export class ProductReview extends BaseEntity {
    @PrimaryColumn()
    id!: string // ADD '!'
  
    @Column()
    product_id!: string // ADD '!'
  
    @ManyToOne(() => Product)
    product: Product
  
    @Column()
    customer_id!: string // ADD '!'
  
    @Column({ type: "int" })
    rating!: number // ADD '!'
  
    @Column({ type: "text" })
    content!: string // ADD '!'
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date // ADD '!'
  
    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "rev")
    }
  }