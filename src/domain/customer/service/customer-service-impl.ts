import EventDispatcher from "../../_shared/event/event-dispatcher";
import Customer from "../entity/customer";
import CustomerAddressUpdatedEvent from "../event/customer-address-updated-event";
import CustomerCreatedEvent from "../event/customer-created-event";
import CustomerRepository from "../repository/customer-repository";
import Address from "../value-object/address";
import CustomerService from "./customer-service";

export default class CustomerServiceImpl implements CustomerService {
  private _customerRepository: CustomerRepository;
  private _eventDispatcher: EventDispatcher;

  constructor(
    customerRepository: CustomerRepository,
    eventDispatcher: EventDispatcher
  ) {
    this._customerRepository = customerRepository;
    this._eventDispatcher = eventDispatcher;
  }

  async create(customer: Customer): Promise<void> {
    await this._customerRepository.create(customer);
    this._eventDispatcher.notify(
      new CustomerCreatedEvent({ id: customer.id, name: customer.name })
    );
  }

  async find(id: string): Promise<Customer> {
    return await this._customerRepository.find(id);
  }

  async updateAddress(customer: Customer, address: Address): Promise<void> {
    customer.changeAddress(address);
    await this._customerRepository.update(customer);
    this._eventDispatcher.notify(
      new CustomerAddressUpdatedEvent({
        id: customer.id,
        name: customer.name,
        address,
      })
    );
  }
}
