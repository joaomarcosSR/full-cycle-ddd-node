import Event, { EventDataType } from "../../_shared/event/event";

type CustomerCreatedType = {
  id: string;
  name: string;
} & EventDataType;

export default class CustomerCreatedEvent extends Event<CustomerCreatedType> {
  constructor(eventData: CustomerCreatedType) {
    super(eventData);
  }
}
