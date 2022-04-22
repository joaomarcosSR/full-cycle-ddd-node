import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../../domain/product/repository/product-repository";
import ProductMapper from "../mapper/product-mapper";
import ProductModel from "../model/product-model";

export default class ProductRepositoryImpl implements ProductRepository {
  private _mapper: ProductMapper;

  constructor(mapper: ProductMapper) {
    this._mapper = mapper;
  }

  public async create(entity: Product): Promise<void> {
    await ProductModel.create(this._mapper.toModel(entity));
  }

  public async update(entity: Product): Promise<void> {
    await ProductModel.update(this._mapper.toModel(entity), {
      where: {
        id: entity.id,
      },
    });
  }

  public async find(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
      return this._mapper.toEntity(productModel);
    } catch (error) {
      throw new Error("Product not found");
    }
  }

  public async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((product) => this._mapper.toEntity(product));
  }
}
