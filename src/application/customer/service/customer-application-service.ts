import CreateCustomerDto from "../dto/create-customer-dto";
import UpdateCustomerAddressDto from "../dto/update-customer-address-dto";

export default interface CustomerApplicationService {
  create(createCustomerDto: CreateCustomerDto): Promise<void>;
  updateAddress(
    updateCustomerAddressDto: UpdateCustomerAddressDto
  ): Promise<void>;
}
