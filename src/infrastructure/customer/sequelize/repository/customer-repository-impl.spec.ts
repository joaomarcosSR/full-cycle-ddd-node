import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../domain/customer/repository/customer-repository";
import Address from "../../../../domain/customer/value-object/address";
import CustomerMapper from "../mapper/customer-mapper";
import CustomerMapperImpl from "../mapper/customer-mapper-impl";
import CustomerModel from "../model/customer-model";
import CustomerRepositoryImpl from "./customer-repository-impl";

describe("Customer repository test", () => {
  let sequelize: Sequelize;
  const mapper: CustomerMapper = new CustomerMapperImpl();

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

  it("should create a customer", async () => {
    const customerRepository: CustomerRepository = new CustomerRepositoryImpl(
      mapper
    );
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository: CustomerRepository = new CustomerRepositoryImpl(
      mapper
    );
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository: CustomerRepository = new CustomerRepositoryImpl(
      mapper
    );
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository: CustomerRepository = new CustomerRepositoryImpl(
      mapper
    );

    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository: CustomerRepository = new CustomerRepositoryImpl(
      mapper
    );
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "ZipCode 1", "City 1");
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "ZipCode 2", "City 2");
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
