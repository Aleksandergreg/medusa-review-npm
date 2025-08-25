import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
  } from "typeorm"
  import { generateEntityId } from "@medusajs/utils"
  
  @Entity()
  export class ProductReview extends BaseEntity {
    @PrimaryColumn()
    id!: string
  
    @Column()
    product_id!: string
  
  
    @Column()
    customer_id!: string
  
    @Column({ type: "int" })
    rating!: number
  
    @Column({ type: "text" })
    content!: string
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date
  
    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "rev")
    }
  }