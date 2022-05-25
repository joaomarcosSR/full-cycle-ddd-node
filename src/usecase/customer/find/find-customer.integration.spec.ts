import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerMapperImpl from "../../../infrastructure/customer/sequelize/mapper/customer-mapper-impl";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer-model";
import CustomerRepositoryImpl from "../../../infrastructure/customer/sequelize/repository/customer-repository-impl";
import FindCustomerImpl from "./find-customer-impl";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerMapper = new CustomerMapperImpl();
    const customerRepository = new CustomerRepositoryImpl(customerMapper);
    const useCase = new FindCustomerImpl(customerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    const result = await useCase.find(input);

    expect(result).toEqual(output);
  });
});
