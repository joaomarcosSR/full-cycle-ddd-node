import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";

export default interface OrderService {
  placeOrder(customer: Customer, items: OrderItem[]): Order;
  total(orders: Order[]): number;
}
