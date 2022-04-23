import Address from "../../../domain/customer/value-object/address";

export default class AddressDto {
  public street: string;
  public number: number;
  public zip: string;
  public city: string;

  public toEntity(): Address {
    return new Address(this.street, this.number, this.zip, this.city);
  }
}
