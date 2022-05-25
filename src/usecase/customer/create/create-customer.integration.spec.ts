import { Sequelize } from "sequelize-typescript";
import CustomerMapperImpl from "../../../infrastructure/customer/sequelize/mapper/customer-mapper-impl";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer-model";
import CustomerRepositoryImpl from "../../../infrastructure/customer/sequelize/repository/customer-repository-impl";
import FindCustomerImpl from "../find/find-customer-impl";
import CreateCustomerImpl from "./create-customer-impl";

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

const MockIdGenerator = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve("123")),
  };
};

describe("Integration test create customer use case", () => {
  it("should create a customer", async () => {
    const mapper = new CustomerMapperImpl();
    const repository = new CustomerRepositoryImpl(mapper);
    const idGenerator = MockIdGenerator();
    const customerCreateUseCase = new CreateCustomerImpl(
      idGenerator,
      repository
    );

    const customerFindUseCase = new FindCustomerImpl(repository);

    const input = {
      name: "John",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
      },
    };

    const output = await customerCreateUseCase.create(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });

    const customer = await customerFindUseCase.find({ id: "123" });

    expect(customer).toEqual({
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
