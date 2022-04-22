import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      let order = new Order("", "123", [item]);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      let order = new Order("123", "", [item]);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
    expect(() => {
      let order = new Order("123", "123", null);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(order.total()).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });
});
