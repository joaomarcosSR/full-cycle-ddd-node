import CustomerRepository from "../../../domain/customer/repository/customer-repository";
import FindCustomer from "./find-customer";
import findCustomerInputDto from "./input-find-customer-dto";
import { OutputFindCustomerDto } from "./output-find-customer-dto";

export default class FindCustomerImpl implements FindCustomer {
  private _repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this._repository = repository;
  }

  async find(input: findCustomerInputDto): Promise<OutputFindCustomerDto> {
    const customer = await this._repository.find(input.id);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    };
  }
}
