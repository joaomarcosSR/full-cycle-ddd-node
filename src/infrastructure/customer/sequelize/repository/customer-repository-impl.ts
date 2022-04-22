import customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../domain/customer/repository/customer-repository";
import CustomerMapper from "../mapper/customer-mapper";
import CustomerModel from "../model/customer-model";

export default class CustomerRepositoryImpl implements CustomerRepository {
  private _mapper: CustomerMapper;

  constructor(mapper: CustomerMapper) {
    this._mapper = mapper;
  }

  public async create(entity: customer): Promise<void> {
    await CustomerModel.create(this._mapper.toModel(entity));
  }
  public async update(entity: customer): Promise<void> {
    await CustomerModel.update(this._mapper.toModel(entity), {
      where: {
        id: entity.id,
      },
    });
  }
  public async find(id: string): Promise<customer> {
    try {
      const customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
      return this._mapper.toEntity(customerModel);
    } catch (error) {
      throw new Error("Customer not found");
    }
  }
  public async findAll(): Promise<customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customer) => this._mapper.toEntity(customer));
  }
}
