import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerImpl from "./list-customer-impl";

const customer1 = new Customer("123", "John Doe");
customer1.changeAddress(new Address("Street 1", 1, "12345", "City"));

const customer2 = new Customer("124", "Jane Doe");
customer2.changeAddress(new Address("Street 2", 2, "123456", "City 2"));

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

describe("Unit test for listing customer use case", () => {
  it("should list a customer", async () => {
    const repository = MockRepository();
    const useCase = new ListCustomerImpl(repository);

    const output = await useCase.list({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});
