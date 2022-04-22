import Product from "../../../domain/product/entity/product";
import ProductService from "../../../domain/product/service/product-service";
import ProductServiceImpl from "./product-service-impl";

describe("Product service unit tests", () => {
  const productService: ProductService = new ProductServiceImpl();

  it("should change the prices of all products", () => {
    const product1 = new Product("product1", "Product 1", 10);
    const product2 = new Product("product2", "Product 2", 20);
    const products = [product1, product2];

    productService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});