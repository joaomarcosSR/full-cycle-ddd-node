import InputFindProductDto from "./input-find-product-dto";
import OutputFindProductDto from "./output-find-product-dto";

export default interface FindProduct {
  find(input: InputFindProductDto): Promise<OutputFindProductDto>;
}
