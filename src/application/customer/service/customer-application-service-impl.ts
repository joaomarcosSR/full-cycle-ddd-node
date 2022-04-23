import CustomerService from "../../../domain/customer/service/customer-service";
import CreateCustomerDto from "../dto/create-customer-dto";
import UpdateCustomerAddressDto from "../dto/update-customer-address-dto";
import IdGenerator from "../utils/id-generator";
import CustomerApplicationService from "./customer-application-service";

export default class CustomerApplicationServiceImpl
  implements CustomerApplicationService
{
  private _customerService: CustomerService;
  private _idGenerator: IdGenerator;

  constructor(customerService: CustomerService, idGenerator: IdGenerator) {
    this._customerService = customerService;
    this._idGenerator = idGenerator;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<void> {
    const customer = createCustomerDto.toEntity(this._idGenerator.generate());
    await this._customerService.create(customer);
  }

  async updateAddress(
    updateCustomerAddressDto: UpdateCustomerAddressDto
  ): Promise<void> {
    const customer = await this._customerService.find(
      updateCustomerAddressDto.id
    );
    await this._customerService.updateAddress(
      customer,
      updateCustomerAddressDto.address.toEntity()
    );
  }
}
