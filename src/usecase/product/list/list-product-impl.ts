import ProductRepository from "../../../domain/product/repository/product-repository";
import inputListProductDto from "./input-list-product-dto";
import ListProduct from "./list-product";
import outputListProductDto from "./output-list-product-dto";

export default class ListProductImpl implements ListProduct {
  private _repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  async list(input: inputListProductDto): Promise<outputListProductDto> {
    const products = (await this._repository.findAll()) || [];

    return {
      products: products.map(({ id, name, price }) => {
        return { id, name, price };
      }),
    };
  }
}
