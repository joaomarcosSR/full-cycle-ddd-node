import EventHandler from "../../../_shared/event/event-handler";
import CustomerCreatedEvent from "../customer-created-event";

export default class SendLogCustomerCreatedHandler
  implements EventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
