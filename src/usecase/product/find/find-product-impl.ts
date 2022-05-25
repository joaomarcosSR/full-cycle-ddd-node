import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../domain/product/repository/product-repository";
import FindProduct from "./find-product";
import inputFindProductDto from "./input-find-product-dto";
import outputFindProductDto from "./output-find-product-dto";

export default class FindProductImpl implements FindProduct {
  private _repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  async find(input: inputFindProductDto): Promise<outputFindProductDto> {
    const product = await this._repository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
