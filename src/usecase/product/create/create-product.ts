import InputCreateProductDto from "./input-create-product-dto";
import OutputCreateProductDto from "./output-create-product-dto";

export default interface CreateProduct {
  create(input: InputCreateProductDto): Promise<OutputCreateProductDto>;
}
