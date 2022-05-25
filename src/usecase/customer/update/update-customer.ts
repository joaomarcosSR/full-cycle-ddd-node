import { InputUpdateCustomerDto } from "./input-update-customer-dto";
import OutputUpdateCustomerDto from "./output-update-customer-dto";

export default interface UpdateCustomer {
  update(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto>;
}
