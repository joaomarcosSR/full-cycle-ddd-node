import Event, { EventDataType } from "./event";

export default interface EventHandler<T extends Event<EventDataType>> {
  handle(event: T): void;
}
