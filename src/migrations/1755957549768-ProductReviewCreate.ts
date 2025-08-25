import { Migration } from "@mikro-orm/migrations"

export class ProductReviewCreate1755957549768 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product_review" ("id" text not null, "product_id" text not null, "customer_id" text not null, "rating" int not null, "content" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), constraint "product_review_pkey" primary key ("id"));'
    )
    this.addSql(
      'alter table "product_review" add constraint "product_review_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;'
    )
  }
}