import { Order } from "./order";

export class OrderData extends Order {
  orderTrackingNumber: string;
  dateCreated: Date;
}
