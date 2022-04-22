import Customer from "../../../../domain/customer/entity/customer";
import Mapper from "../../../_shared/mapper/mapper";
import CustomerModel from "../model/customer-model";

export default interface CustomerMapper
  extends Mapper<Customer, CustomerModel> {}
