import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerImpl from "./update-customer-impl";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerImpl(customerRepository);

    const output = await customerUpdateUseCase.update(input);

    expect(output).toEqual(input);
  });
});
