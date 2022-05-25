import { Sequelize } from "sequelize-typescript";
import ProductMapperImpl from "../../../infrastructure/product/sequelize/mapper/product-mapper-impl";
import ProductModel from "../../../infrastructure/product/sequelize/model/product-model";
import ProductRepositoryImpl from "../../../infrastructure/product/sequelize/repository/product-repository-impl";
import FindProductImpl from "../find/find-product-impl";
import CreateProduct from "./create-product";
import CreateProductImpl from "./create-product-impl";

describe("Integration test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
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

  it("should create a product", async () => {
    const productMapper = new ProductMapperImpl();
    const productRepository = new ProductRepositoryImpl(productMapper);
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

    const findProductUseCase = new FindProductImpl(productRepository);

    const response = await findProductUseCase.find({ id: "123" });

    expect(response).toEqual(output);
  });
});
