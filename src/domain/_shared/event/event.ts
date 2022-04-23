export type EventDataType = {};

export default abstract class Event<T> {
  private _dataTimeOcurred: Date;
  private _eventData: T;

  constructor(eventData: T) {
    this._dataTimeOcurred = new Date();
    this._eventData = eventData;
  }

  get dataTimeOcurred(): Date {
    return this._dataTimeOcurred;
  }

  get eventData(): T {
    return this._eventData;
  }
}
