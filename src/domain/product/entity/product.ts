import Entity from "../../_shared/entity/entity-abstract";
import NotificationError from "../../_shared/notification/notification-error";

export default class Product extends Entity {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  public changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  private validate(): void {
    if (!this._id) this.addError("Id is required");
    if (!this._name) this.addError("Name is required");
    if (this._price <= 0) this.addError("Price must be greater than zero");
  }

  private addError(message: string): void {
    this.notification.addError({
      context: "product",
      message: message,
    });
  }
}
