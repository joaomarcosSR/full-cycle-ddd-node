import ProductRepository from "../../../domain/product/repository/product-repository";
import InputUpdateProductDto from "./input-update-product-dto";
import OutputUpdateProductDto from "./output-update-product-dto";
import UpdateProduct from "./update-product";

export default class UpdateProductImpl implements UpdateProduct {
  private _repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  async update(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this._repository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);

    await this._repository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
