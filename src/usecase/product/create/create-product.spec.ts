import CreateProduct from "./create-product";
import CreateProductImpl from "./create-product-impl";

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

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const idGenerator = MockIdGenerator();
    const useCase: CreateProduct = new CreateProductImpl(
      idGenerator,
      productRepository
    );

    const input = {
      name: "computer",
      price: 5000,
    };

    const output = {
      id: "123",
      name: "computer",
      price: 5000,
    };

    const result = await useCase.create(input);

    expect(result).toEqual(output);
  });
});
