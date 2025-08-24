import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ProductReviewCreate1724429983984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product_review",
        columns: [
          { name: "id", type: "varchar", isPrimary: true },
          { name: "product_id", type: "varchar" },
          { name: "customer_id", type: "varchar" },
          { name: "rating", type: "int" },
          { name: "content", type: "text" },
          { name: "created_at", type: "timestamptz", default: "now()" },
        ],
        foreignKeys: [
          {
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "product",
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product_review")
  }
}