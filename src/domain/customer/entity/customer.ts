import Entity from "../../_shared/entity/entity-abstract";
import NotificationError from "../../_shared/notification/notification-error";
import CustomerValidatorFactory from "../factory/customer-validator-factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
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

  public get address(): Address {
    return this._address;
  }

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public isActive(): boolean {
    return this._active;
  }

  public changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  public changeAddress(address: Address) {
    this._address = address;
  }

  public activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  public deactivate() {
    this._active = false;
  }

  public addRewardPoints(value: number): void {
    this._rewardPoints += value;
  }

  private validate(): void {
    CustomerValidatorFactory.create().validate(this);
  }
}
