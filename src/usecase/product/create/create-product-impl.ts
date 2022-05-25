import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../domain/product/repository/product-repository";
import IdGenerator from "../../../domain/_shared/utils/id-generator";
import CreateProduct from "./create-product";
import inputCreateProductDto from "./input-create-product-dto";
import outputCreateProductDto from "./output-create-product-dto";

export default class CreateProductImpl implements CreateProduct {
  private _idGenerator: IdGenerator;
  private _repository: ProductRepository;

  constructor(idGenerator: IdGenerator, repository: ProductRepository) {
    this._idGenerator = idGenerator;
    this._repository = repository;
  }

  async create(input: inputCreateProductDto): Promise<outputCreateProductDto> {
    const product = new Product(
      await this._idGenerator.generate(),
      input.name,
      input.price
    );

    await this._repository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
