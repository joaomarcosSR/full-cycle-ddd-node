import CreateCustomerImpl from "./create-customer-impl";
import InputCreateCustomerDto from "./input-create-customer-dto";

let input: InputCreateCustomerDto;

beforeEach(() => {
  input = {
    name: "John",
    address: {
      street: "Street",
      number: 123,
      zip: "Zip",
      city: "City",
    },
  };
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const MockIdGenerator = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve("123")),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const repository = MockRepository();
    const idGenerator = MockIdGenerator();
    const customerCreateUseCase = new CreateCustomerImpl(
      idGenerator,
      repository
    );

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
  });

  it("should thrown an error when name is missing", async () => {
    const repository = MockRepository();
    const idGenerator = MockIdGenerator();
    const customerCreateUseCase = new CreateCustomerImpl(
      idGenerator,
      repository
    );

    input.name = "";

    await expect(customerCreateUseCase.create(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when street is missing", async () => {
    const repository = MockRepository();
    const idGenerator = MockIdGenerator();
    const customerCreateUseCase = new CreateCustomerImpl(
      idGenerator,
      repository
    );

    input.address.street = "";

    await expect(customerCreateUseCase.create(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
