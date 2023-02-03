export interface IOrderData {
  type: string;
  retailer_order_id: string;
  order_lines: Array<IOrderLines>;
  shipping_paid: number;
  shipping_method_code: string;
  retailer_id: number;
  expired: boolean;
  created_at: Date;
}

export interface IOrderLines {
  retailer_id: number;
  notes: Array<any>;
  quantity: number;
  retailer_sku: string;
  billed_amount: number;
  original_quantity: number;
  unit_price: number;
  tax_billed_amount: number;
  variant_id: number;
}

// export interface OrderAttributes {
//   retailer_id: number;
//   type: string;
//   shipping_paid: number;
//   shipping_method_code: string;
//   expired: boolean;
//   created_at: Date;
// }
