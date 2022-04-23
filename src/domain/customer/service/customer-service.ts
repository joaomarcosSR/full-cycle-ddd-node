import Customer from "../entity/customer";
import Address from "../value-object/address";

export default interface CustomerService {
  create(customer: Customer): Promise<void>;
  find(id: string): Promise<Customer>;
  updateAddress(customer: Customer, address: Address): Promise<void>;
}
