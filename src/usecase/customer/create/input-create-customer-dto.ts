export default interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}
