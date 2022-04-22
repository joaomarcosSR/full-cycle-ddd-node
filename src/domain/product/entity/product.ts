export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
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
    if (!this._id) throw new Error("Id is required");
    if (!this._name) throw new Error("Name is required");
    if (this._price <= 0) throw new Error("Price must be greater than zero");
  }
}
