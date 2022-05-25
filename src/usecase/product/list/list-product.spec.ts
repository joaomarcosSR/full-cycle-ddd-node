import Product from "../../../domain/product/entity/product";
import ListProduct from "./list-product";
import ListProductImpl from "./list-product-impl";

const product1 = new Product("123", "computer", 5000);
const product2 = new Product("456", "keyboard", 100);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test list product use case", () => {
  it("should list a product", async () => {
    const productRepository = MockRepository();
    const useCase: ListProduct = new ListProductImpl(productRepository);

    const input = {};

    const output = {
      products: [
        {
          id: "123",
          name: "computer",
          price: 5000,
        },
        {
          id: "456",
          name: "keyboard",
          price: 100,
        },
      ],
    };

    const result = await useCase.list(input);

    expect(result).toEqual(output);
  });
});
