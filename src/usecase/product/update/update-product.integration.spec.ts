import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductMapperImpl from "../../../infrastructure/product/sequelize/mapper/product-mapper-impl";
import ProductModel from "../../../infrastructure/product/sequelize/model/product-model";
import ProductRepositoryImpl from "../../../infrastructure/product/sequelize/repository/product-repository-impl";
import FindProductImpl from "../find/find-product-impl";
import UpdateProduct from "./update-product";
import UpdateProductImpl from "./update-product-impl";

describe("Integration test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productMapper = new ProductMapperImpl();
    const productRepository = new ProductRepositoryImpl(productMapper);
    const useCase: UpdateProduct = new UpdateProductImpl(productRepository);

    const product = new Product("123", "computer", 5000);
    await productRepository.create(product);

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

    const findProductUseCase = new FindProductImpl(productRepository);

    const response = await findProductUseCase.find({ id: "123" });

    expect(response).toEqual(output);
  });
});
