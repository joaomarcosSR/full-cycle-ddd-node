type Product = {
  id: string;
  name: string;
  price: number;
};

export default interface OutputListProductDto {
  products: Product[];
}
