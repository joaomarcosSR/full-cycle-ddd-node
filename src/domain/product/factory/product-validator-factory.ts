import Validator from "../../_shared/validator/validator";
import Product from "../entity/product";
import ProductYupValidator from "../validator/product-yup-validator";

export default class ProductValidatorFactory {
  public static create(): Validator<Product> {
    return new ProductYupValidator();
  }
}
