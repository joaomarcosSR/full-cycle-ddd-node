import EventHandler from "../../../_shared/event/event-handler";
import CustomerCreatedEvent from "../customer-created-event";

export default class ResendLogCustomerCreatedHandler
  implements EventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
