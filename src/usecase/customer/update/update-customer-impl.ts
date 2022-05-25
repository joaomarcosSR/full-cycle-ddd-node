import CustomerRepository from "../../../domain/customer/repository/customer-repository";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "./input-update-customer-dto";
import outputUpdateCustomerDto from "./output-update-customer-dto";
import UpdateCustomer from "./update-customer";

export default class UpdateCustomerImpl implements UpdateCustomer {
  private _repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this._repository = repository;
  }

  async update(
    input: InputUpdateCustomerDto
  ): Promise<outputUpdateCustomerDto> {
    const customer = await this._repository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );
    await this._repository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
