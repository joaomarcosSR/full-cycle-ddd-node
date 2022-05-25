import InputCreateCustomerDto from "./input-create-customer-dto";
import OutputCreateCustomerDto from "./output-create-customer-dto";

export default interface CreateCustomer {
  create(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>;
}
