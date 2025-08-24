import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
  } from "typeorm"
  import { Product } from "@medusajs/medusa/dist/models"
  import { generateEntityId } from "@medusajs/utils"
  
  @Entity()
  export class ProductReview extends BaseEntity {
    @PrimaryColumn()
    id: string
  
    @Column()
    product_id: string
  
    @ManyToOne(() => Product)
    product: Product
  
    @Column()
    customer_id: string
    
    // We'll leave the customer relation out for simplicity, 
    // but you could add a @ManyToOne relation here.
  
    @Column({ type: "int" })
    rating: number
  
    @Column({ type: "text" })
    content: string
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
  
    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "rev")
    }
  }

  export default ProductReview;