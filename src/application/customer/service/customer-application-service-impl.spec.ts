import Customer from "../../../domain/customer/entity/customer";
import CustomerService from "../../../domain/customer/service/customer-service";
import Address from "../../../domain/customer/value-object/address";
import AddressDto from "../dto/address-dto";
import CreateCustomerDto from "../dto/create-customer-dto";
import UpdateCustomerAddressDto from "../dto/update-customer-address-dto";
import IdGenerator from "../utils/id-generator";
import CustomerApplicationService from "./customer-application-service";
import CustomerApplicationServiceImpl from "./customer-application-service-impl";

describe("Customer application service unit tets", () => {
  const customerService: CustomerService = {
    create: async (customer: Customer) => Promise.resolve(),
    updateAddress: async (customer: Customer, address: Address) =>
      Promise.resolve(),
    find: async (id: string) => Promise.resolve(new Customer(id, "John")),
  };

  const idGenerator: IdGenerator = {
    generate: () => "123",
  };

  const customerApplicationService: CustomerApplicationService =
    new CustomerApplicationServiceImpl(customerService, idGenerator);

  it("Should create a customer", async () => {
    const dto = Object.assign(new CreateCustomerDto(), { name: "John" });
    const spyCustomerService = jest.spyOn(customerService, "create");

    await customerApplicationService.create(dto);

    expect(spyCustomerService).toBeCalledWith(new Customer("123", "John"));
  });

  it("Should create a customer with address", async () => {
    const dto = Object.assign(new CreateCustomerDto(), {
      name: "John",
      address: Object.assign(new AddressDto(), {
        street: "Street 1",
        number: 98,
        zip: "13330-250",
        city: "São Paulo",
      }),
    });
    const spyCustomerService = jest.spyOn(customerService, "create");

    await customerApplicationService.create(dto);

    const expected = new Customer("123", "John");
    expected.changeAddress(
      new Address("Street 1", 98, "13330-250", "São Paulo")
    );

    expect(spyCustomerService).toBeCalledWith(expected);
  });

  it("Should get a customer and update it's address", async () => {
    const dto = Object.assign(new UpdateCustomerAddressDto(), {
      id: "123",
      address: Object.assign(new AddressDto(), {
        street: "Street 1",
        number: 98,
        zip: "13330-250",
        city: "São Paulo",
      }),
    });
    const spyFindCustomerService = jest.spyOn(customerService, "find");
    const spyUpdateCustomerService = jest.spyOn(
      customerService,
      "updateAddress"
    );

    await customerApplicationService.updateAddress(dto);

    expect(spyFindCustomerService).toBeCalledWith("123");
    expect(spyUpdateCustomerService).toBeCalledWith(
      new Customer("123", "John"),
      new Address("Street 1", 98, "13330-250", "São Paulo")
    );
  });
});
