import Customer from "../../../domain/customer/entity/customer";
import AddressDto from "./address-dto";

export default class CreateCustomerDto {
  public name: string;
  public address!: AddressDto;

  public toEntity(id: string): Customer {
    const customer = new Customer(id, this.name);
    if (this.address) customer.changeAddress(this.address.toEntity());
    return customer;
  }
}
