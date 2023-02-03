import { Table, Model, Column, PrimaryKey } from "sequelize-typescript";

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @Column
  retailer_id!: number;

  @Column
  type!: string;

  @Column
  shipping_paid!: number;

  @Column
  shipping_method_code!: string;

  @Column
  expired!: boolean;

  @Column
  created_at!: Date;
}
