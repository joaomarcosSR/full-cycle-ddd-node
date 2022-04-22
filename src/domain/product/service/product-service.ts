import Product from "../entity/product";

export default interface ProductService {
  increasePrice(products: Product[], percentage: number): void;
}
