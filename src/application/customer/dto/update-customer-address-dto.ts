import Customer from "../../../domain/customer/entity/customer";
import AddressDto from "./address-dto";

export default class UpdateCustomerAddressDto {
  public id: string;
  public address: AddressDto;

  public toEntity({ id, name }: Customer): Customer {
    const newCustomer = new Customer(id, name);
    newCustomer.changeAddress(this.address.toEntity());
    return newCustomer;
  }
}
