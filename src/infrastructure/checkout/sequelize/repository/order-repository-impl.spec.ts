import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import OrderRepository from "../../../../domain/checkout/repository/order-repository";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../domain/customer/repository/customer-repository";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../../domain/product/repository/product-repository";
import CustomerMapperImpl from "../../../customer/sequelize/mapper/customer-mapper-impl";
import CustomerModel from "../../../customer/sequelize/model/customer-model";
import CustomerRepositoryImpl from "../../../customer/sequelize/repository/customer-repository-impl";
import ProductMapperImpl from "../../../product/sequelize/mapper/product-mapper-impl";
import ProductModel from "../../../product/sequelize/model/product-model";
import ProductRepositoryImpl from "../../../product/sequelize/repository/product-repository-impl";
import OrderItemMapperImpl from "../mapper/order-item-mapper-impl";
import OrderMapperImpl from "../mapper/order-mapper-impl";
import OrderItemModel from "../model/order-item-model";
import OrderModel from "../model/order-model";
import OrderRepositoryImpl from "./order-repository-impl";

describe("Order repository test", () => {
  const itemMapper = new OrderItemMapperImpl();
  const orderMapper = new OrderMapperImpl(itemMapper);
  const customerMapper = new CustomerMapperImpl();
  const productMapper = new ProductMapperImpl();
  let sequelize: Sequelize;
  const productRepository: ProductRepository = new ProductRepositoryImpl(
    productMapper
  );
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();

    const customerRepository: CustomerRepository = new CustomerRepositoryImpl(
      customerMapper
    );
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    orderRepository = new OrderRepositoryImpl(sequelize, orderMapper);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);
    const product3 = new Product("789", "Product 3", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    const orderItem1 = convertProductToItem(product1, "1", 2);
    const orderItem2 = convertProductToItem(product2, "2", 5);
    const orderItem3 = convertProductToItem(product3, "3", 3);

    const order = new Order("123", "123", [orderItem1, orderItem2]);

    await orderRepository.create(order);

    const updatedOrderItem2 = convertProductToItem(product2, "2", 50);
    const updatedOrder = new Order("123", "123", [
      updatedOrderItem2,
      orderItem3,
    ]);

    await orderRepository.update(updatedOrder);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: updatedOrder.total(),
      items: [
        {
          id: updatedOrderItem2.id,
          name: updatedOrderItem2.name,
          price: updatedOrderItem2.price,
          quantity: updatedOrderItem2.quantity,
          order_id: "123",
          product_id: "456",
        },
        {
          id: orderItem3.id,
          name: orderItem3.name,
          price: orderItem3.price,
          quantity: orderItem3.quantity,
          order_id: "123",
          product_id: "789",
        },
      ],
    });
  });

  it("should find a order", async () => {
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const orderItem = convertProductToItem(product, "1", 2);
    const order = new Order("123", "123", [orderItem]);

    await orderRepository.create(order);

    const foundOrder = await orderRepository.find("123");
    expect(order).toStrictEqual(foundOrder);
  });

  it("should find all orders", async () => {
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);
    const product3 = new Product("789", "Product 3", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    const orderItem1 = convertProductToItem(product1, "1", 2);
    const orderItem2 = convertProductToItem(product2, "2", 5);
    const orderItem3 = convertProductToItem(product3, "3", 3);

    const order1 = new Order("123", "123", [orderItem1, orderItem2]);
    const order2 = new Order("456", "123", [orderItem3]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();
    expect([order1, order2]).toStrictEqual(foundOrders);
  });

  function convertProductToItem(
    product: Product,
    itemId: string,
    itemQuantity: number
  ): OrderItem {
    return new OrderItem(
      itemId,
      product.name,
      product.price,
      product.id,
      itemQuantity
    );
  }
});
