import Event, { EventDataType } from "../../_shared/event/event";
import Address from "../value-object/address";

type CustomerAddressUpdatedType = {
  id: string;
  name: string;
  address: Address;
} & EventDataType;

export default class CustomerAddressUpdatedEvent extends Event<CustomerAddressUpdatedType> {
  constructor(eventData: CustomerAddressUpdatedType) {
    super(eventData);
  }
}
