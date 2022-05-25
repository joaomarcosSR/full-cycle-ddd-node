import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerMapperImpl from "../../../infrastructure/customer/sequelize/mapper/customer-mapper-impl";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer-model";
import CustomerRepositoryImpl from "../../../infrastructure/customer/sequelize/repository/customer-repository-impl";
import ListCustomerImpl from "./list-customer-impl";

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

describe("Integration test for listing customer use case", () => {
  it("should list a customer", async () => {
    const customerMapper = new CustomerMapperImpl();
    const customerRepository = new CustomerRepositoryImpl(customerMapper);
    const useCase = new ListCustomerImpl(customerRepository);

    const customer1 = new Customer("123", "John Doe");
    customer1.changeAddress(new Address("Street 1", 1, "12345", "City"));
    await customerRepository.create(customer1);

    const customer2 = new Customer("124", "Jane Doe");
    customer2.changeAddress(new Address("Street 2", 2, "123456", "City 2"));
    await customerRepository.create(customer2);

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
