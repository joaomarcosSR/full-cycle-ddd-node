import InputUpdateProductDto from "./input-update-product-dto";
import OutputUpdateProductDto from "./output-update-product-dto";

export default interface UpdateProduct {
  update(input: InputUpdateProductDto): Promise<OutputUpdateProductDto>;
}
