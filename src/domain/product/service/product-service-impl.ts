import product from "../../../domain/product/entity/product";
import ProductService from "../../../domain/product/service/product-service";

export default class ProductServiceImpl implements ProductService {
  increasePrice(products: product[], percentage: number): void {
    products.forEach((product) =>
      product.changePrice(product.price * (1 + percentage / 100))
    );
  }
}
