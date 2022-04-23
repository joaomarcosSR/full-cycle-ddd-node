import Event, { EventDataType } from "./event";
import EventDispatcher from "./event-dispatcher";
import EventDispatcherImpl from "./event-dispatcher-impl";
import EventHandler from "./event-handler";

class TestEvent extends Event<EventDataType> {
  constructor(eventData: any) {
    super(eventData);
  }
}

describe("Domain events tests", () => {
  const eventDispatcher: EventDispatcher = new EventDispatcherImpl();
  const event: Event<EventDataType> = new TestEvent({
    name: "Test 1",
  });

  it("should register events handler and notify it", () => {
    const eventHandler1: EventHandler<TestEvent> = { handle: () => {} };
    const eventHandler2: EventHandler<TestEvent> = { handle: () => {} };
    const eventHandler3: EventHandler<TestEvent> = { handle: () => {} };
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

    eventDispatcher.register("TestEvent", eventHandler1);
    eventDispatcher.register("NotHandle", eventHandler2);
    eventDispatcher.register("TestEvent", eventHandler3);
    eventDispatcher.notify(event);

    expect(spyEventHandler1).toBeCalledTimes(1);
    expect(spyEventHandler2).toBeCalledTimes(0);
    expect(spyEventHandler3).toBeCalledTimes(1);
  });

  it("should unregister an event handler", () => {
    const eventHandler1: EventHandler<TestEvent> = { handle: () => {} };
    const eventHandler2: EventHandler<TestEvent> = { handle: () => {} };
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("TestEvent", eventHandler1);
    eventDispatcher.register("TestEvent", eventHandler2);

    eventDispatcher.unregister("TestEvent", eventHandler1);

    eventDispatcher.notify(event);

    expect(spyEventHandler1).toBeCalledTimes(0);
    expect(spyEventHandler2).toBeCalledTimes(1);
  });

  it("should unregister an event handler", () => {
    const eventHandler1: EventHandler<TestEvent> = { handle: () => {} };
    const eventHandler2: EventHandler<TestEvent> = { handle: () => {} };
    const eventHandler3: EventHandler<TestEvent> = { handle: () => {} };
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

    eventDispatcher.register("TestEvent", eventHandler1);
    eventDispatcher.register("TestEvent", eventHandler2);
    eventDispatcher.register("TestEvent", eventHandler3);

    eventDispatcher.unregisterAll();

    eventDispatcher.notify(event);

    expect(spyEventHandler1).toBeCalledTimes(0);
    expect(spyEventHandler2).toBeCalledTimes(0);
    expect(spyEventHandler3).toBeCalledTimes(0);
  });
});
