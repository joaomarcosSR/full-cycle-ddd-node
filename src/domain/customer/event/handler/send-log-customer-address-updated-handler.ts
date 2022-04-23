import EventHandler from "../../../_shared/event/event-handler";
import CustomerAddressUpdatedEvent from "../customer-address-updated-event";

export default class SendLogCustomerAddressUpdatedHandler
  implements EventHandler<CustomerAddressUpdatedEvent>
{
  handle({ eventData }: CustomerAddressUpdatedEvent): void {
    const { id, name, address } = eventData;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`
    );
  }
}
