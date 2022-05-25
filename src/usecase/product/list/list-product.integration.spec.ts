import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductMapperImpl from "../../../infrastructure/product/sequelize/mapper/product-mapper-impl";
import ProductModel from "../../../infrastructure/product/sequelize/model/product-model";
import ProductRepositoryImpl from "../../../infrastructure/product/sequelize/repository/product-repository-impl";
import ListProductImpl from "./list-product-impl";

describe("Integration test list product use case", () => {
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

  it("should list a product", async () => {
    const productMapper = new ProductMapperImpl();
    const productRepository = new ProductRepositoryImpl(productMapper);
    const useCase = new ListProductImpl(productRepository);

    const product1 = new Product("123", "computer", 5000);
    const product2 = new Product("456", "keyboard", 100);

    await productRepository.create(product1);
    await productRepository.create(product2);

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

    const result = await useCase.list({});

    expect(result).toEqual(output);
  });
});
