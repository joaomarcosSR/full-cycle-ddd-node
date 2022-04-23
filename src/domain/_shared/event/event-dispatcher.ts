import Event, { EventDataType } from "./event";
import EventHandler from "./event-handler";

export default interface EventDispatcher {
  notify(event: Event<EventDataType>): void;
  register(
    eventName: string,
    eventHandler: EventHandler<Event<EventDataType>>
  ): void;
  unregister(
    eventName: string,
    eventHandler: EventHandler<Event<EventDataType>>
  ): void;
  unregisterAll(): void;
}
