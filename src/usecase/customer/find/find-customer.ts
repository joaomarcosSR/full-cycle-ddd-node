import InputFindCustomerDto from "./input-find-customer-dto";
import { OutputFindCustomerDto } from "./output-find-customer-dto";

export default interface FindCustomer {
  find(input: InputFindCustomerDto): Promise<OutputFindCustomerDto>;
}
