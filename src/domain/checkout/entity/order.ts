import OrderItem from "./order-item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  public get id(): string {
    return this._id;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public total(): number {
    return this._items.reduce((sum, item) => sum + item.total(), 0);
  }

  private validate(): void {
    if (!this._id) throw new Error("Id is required");
    if (!this._customerId) throw new Error("CustomerId is required");
    if (!(this._items || []).length) throw new Error("Items are required");
  }
}
