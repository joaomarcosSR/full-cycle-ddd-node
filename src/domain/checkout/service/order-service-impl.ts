import Order from "../../../domain/checkout/entity/order";
import order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order-item";
import OrderService from "../../../domain/checkout/service/order-service";
import Customer from "../../../domain/customer/entity/customer";
import { v4 as uuid } from "uuid";

export default class OrderServiceImpl implements OrderService {
  placeOrder(customer: Customer, items: OrderItem[]): Order {
    const order = new Order(uuid(), customer.id, items);
    items.forEach((item) => customer.addRewardPoints(item.total() / 2));

    return order;
  }
  total(orders: order[]): number {
    return orders.reduce((sum, order) => sum + order.total(), 0);
  }
}
