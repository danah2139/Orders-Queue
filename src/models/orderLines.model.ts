import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
} from "sequelize-typescript";
import { Order } from "./order.model";

@Table
export class OrderLines extends Model<OrderLines> {
  @PrimaryKey
  @Column
  order_id!: number;

  @Column(DataType.JSON)
  notes!: JSON;

  @Column
  quantity!: number;

  @Column
  retailer_sku!: string;

  @Column
  billed_amount!: number;

  @Column
  original_quantity!: number;

  @Column
  unit_price!: number;

  @Column
  tax_billed_amount!: number;

  @ForeignKey(() => Order)
  @Column
  variant_id!: number;
}
