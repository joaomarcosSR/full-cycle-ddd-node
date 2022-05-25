import Product from "../../../domain/product/entity/product";
import UpdateProduct from "./update-product";
import UpdateProductImpl from "./update-product-impl";

const product = new Product("123", "computer", 5000);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValueOnce(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const useCase: UpdateProduct = new UpdateProductImpl(productRepository);

    const input = {
      id: "123",
      name: "computer Updated",
      price: 6000,
    };

    const output = {
      id: "123",
      name: "computer Updated",
      price: 6000,
    };

    const result = await useCase.update(input);

    expect(result).toEqual(output);
  });
});
