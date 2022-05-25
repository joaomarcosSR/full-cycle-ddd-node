import Product from "../../../domain/product/entity/product";
import FindProduct from "./find-product";
import FindProductImpl from "./find-product-impl";

const product = new Product("123", "computer", 5000);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase: FindProduct = new FindProductImpl(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "computer",
      price: 5000,
    };

    const result = await useCase.find(input);

    expect(result).toEqual(output);
  });
});
