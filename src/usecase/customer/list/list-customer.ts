import InputListCustomerDto from "./input-list-customer-dto";
import OutputListCustomerDto from "./output-list-customer-dto";

export default interface ListCustomer {
  list(input: InputListCustomerDto): Promise<OutputListCustomerDto>;
}
