import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductMapperImpl from "../../../infrastructure/product/sequelize/mapper/product-mapper-impl";
import ProductModel from "../../../infrastructure/product/sequelize/model/product-model";
import ProductRepositoryImpl from "../../../infrastructure/product/sequelize/repository/product-repository-impl";
import FindProductImpl from "./find-product-impl";

describe("Test find product use case", () => {
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

  it("should find a product", async () => {
    const productMapper = new ProductMapperImpl();
    const productRepository = new ProductRepositoryImpl(productMapper);
    const useCase = new FindProductImpl(productRepository);

    const product = new Product("123", "computer", 5000);

    await productRepository.create(product);

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
