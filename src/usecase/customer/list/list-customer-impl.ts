import CustomerRepository from "../../../domain/customer/repository/customer-repository";
import ListCustomer from "./list-customer";
import InputListCustomerDto from "./input-list-customer-dto";
import OutputListCustomerDto from "./output-list-customer-dto";

export default class ListCustomerImpl implements ListCustomer {
  private _repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this._repository = repository;
  }

  async list(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this._repository.findAll();

    return {
      customers: customers.map((customer) => {
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
      }),
    };
  }
}
