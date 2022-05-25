import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../domain/customer/repository/customer-repository";
import Address from "../../../domain/customer/value-object/address";
import IdGenerator from "../../../domain/_shared/utils/id-generator";
import CreateCustomer from "./create-customer";
import inputCreateCustomerDto from "./input-create-customer-dto";
import outputCreateCustomerDto from "./output-create-customer-dto";

export default class CreateCustomerImpl implements CreateCustomer {
  private _repository: CustomerRepository;
  private _idGenerator: IdGenerator;

  constructor(idGenerator: IdGenerator, repository: CustomerRepository) {
    this._repository = repository;
    this._idGenerator = idGenerator;
  }

  async create(
    input: inputCreateCustomerDto
  ): Promise<outputCreateCustomerDto> {
    const id = await this._idGenerator.generate();
    const customer = new Customer(id, input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    await this._repository.create(customer);

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
