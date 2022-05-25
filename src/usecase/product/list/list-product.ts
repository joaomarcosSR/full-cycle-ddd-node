import InputListProductDto from "./input-list-product-dto";
import OutputListProductDto from "./output-list-product-dto";

export default interface ListProduct {
  list(input: InputListProductDto): Promise<OutputListProductDto>;
}
