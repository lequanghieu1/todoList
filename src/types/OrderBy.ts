type OrderBy = "todo" | "state" | "createdAt";

export interface IOrder {
  order: OrderBy;
  reverse: boolean;
}

export default OrderBy;
