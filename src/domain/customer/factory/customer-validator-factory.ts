import Validator from "../../_shared/validator/validator";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer-yup-validator";

export default class CustomerValidatorFactory {
  public static create(): Validator<Customer> {
    return new CustomerYupValidator();
  }
}
