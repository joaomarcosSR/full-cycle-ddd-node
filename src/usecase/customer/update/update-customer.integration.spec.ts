import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerMapperImpl from "../../../infrastructure/customer/sequelize/mapper/customer-mapper-impl";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer-model";
import CustomerRepositoryImpl from "../../../infrastructure/customer/sequelize/repository/customer-repository-impl";
import FindCustomerImpl from "../find/find-customer-impl";
import UpdateCustomerImpl from "./update-customer-impl";

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

describe("Integration test update customer use case", () => {
  it("should create a customer", async () => {
    const mapper = new CustomerMapperImpl();
    const repository = new CustomerRepositoryImpl(mapper);
    const updateCreateUseCase = new UpdateCustomerImpl(repository);

    const customerFindUseCase = new FindCustomerImpl(repository);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

    await repository.create(customer);

    const input = {
      id: "123",
      name: "John Updated",
      address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
      },
    };

    const output = await updateCreateUseCase.update(input);

    expect(output).toEqual({
      id: "123",
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });

    const response = await customerFindUseCase.find({ id: "123" });

    expect(response).toEqual({
      id: "123",
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});
