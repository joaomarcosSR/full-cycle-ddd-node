import Event, { EventDataType } from "./event";
import EventDispatcher from "./event-dispatcher";
import EventHandler from "./event-handler";

export default class EventDispatcherImpl implements EventDispatcher {
  private _eventHandlers: {
    [eventName: string]: EventHandler<Event<EventDataType>>[];
  } = {};

  notify(event: Event<EventDataType>): void {
    const eventName = event.constructor.name;
    (this._eventHandlers[eventName] || []).forEach((handler) =>
      handler.handle(event)
    );
  }

  register(
    eventName: string,
    eventHandler: EventHandler<Event<EventDataType>>
  ): void {
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
    this._eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: EventHandler<Event<EventDataType>>
  ): void {
    const handlers = this._eventHandlers[eventName] || [];
    const index = handlers.indexOf(eventHandler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {};
  }
}
