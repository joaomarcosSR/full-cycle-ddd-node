import EventDispatcher from "../../_shared/event/event-dispatcher";
import EventDispatcherImpl from "../../_shared/event/event-dispatcher-impl";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "../event/customer-created-event";
import ResendLogCustomerCreatedHandler from "../event/handler/resend-log-customer-created-handler";
import SendLogCustomerAddressUpdatedHandler from "../event/handler/send-log-customer-address-updated-handler";
import SendLogCustomerCreatedHandler from "../event/handler/send-log-customer-created-handler";
import CustomerRepository from "../repository/customer-repository";
import Address from "../value-object/address";
import CustomerService from "./customer-service";
import CustomerServiceImpl from "./customer-service-impl";

describe("Customer application service unit tets", () => {
  const customer = new Customer("123", "John");

  const customerRepository: CustomerRepository = {
    create: async (entity: Customer) => Promise.resolve(),
    update: async (entity: Customer) => Promise.resolve(),
    find: async (id: string) => Promise.resolve(customer),
    findAll: async () => Promise.resolve([customer]),
  };

  const eventDispatcher: EventDispatcher = new EventDispatcherImpl();

  const sendLogCustomerCreatedHandler = new SendLogCustomerCreatedHandler();
  const resendLogCustomerCreatedHandler = new ResendLogCustomerCreatedHandler();
  const sendLogCustomerAddressUpdatedHandler =
    new SendLogCustomerAddressUpdatedHandler();

  eventDispatcher.register(
    "CustomerCreatedEvent",
    sendLogCustomerCreatedHandler
  );
  eventDispatcher.register(
    "CustomerCreatedEvent",
    resendLogCustomerCreatedHandler
  );
  eventDispatcher.register(
    "CustomerAddressUpdatedEvent",
    sendLogCustomerAddressUpdatedHandler
  );

  const customerService: CustomerService = new CustomerServiceImpl(
    customerRepository,
    eventDispatcher
  );

  it("should return a customer when try to find", async () => {
    const foundCustomer = await customerService.find("123");
    expect(foundCustomer).toBe(customer);
  });

  it("should create a customer and send notification", async () => {
    const spyCustomerService = jest.spyOn(customerRepository, "create");
    const spySendEventHandler = jest.spyOn(
      sendLogCustomerCreatedHandler,
      "handle"
    );
    const spyResendEventHandler = jest.spyOn(
      resendLogCustomerCreatedHandler,
      "handle"
    );

    await customerService.create(customer);

    expect(spyCustomerService).toBeCalledWith(customer);
    expect(spySendEventHandler).toBeCalledWith(
      expect.objectContaining({ eventData: { id: "123", name: "John" } })
    );
    expect(spyResendEventHandler).toBeCalledWith(
      expect.objectContaining({ eventData: { id: "123", name: "John" } })
    );
  });

  it("should update the customer Address and send notification", async () => {
    const spyCustomerService = jest.spyOn(customerRepository, "update");
    const spySendEventHandler = jest.spyOn(
      sendLogCustomerAddressUpdatedHandler,
      "handle"
    );

    const address = new Address("Street 1", 98, "13330-250", "São Paulo");

    await customerService.updateAddress(customer, address);

    expect(spyCustomerService).toBeCalledWith(
      expect.objectContaining({
        id: "123",
        name: "John",
        address,
      })
    );
    expect(spySendEventHandler).toBeCalledWith(
      expect.objectContaining({
        eventData: { id: "123", name: "John", address },
      })
    );
  });
});
