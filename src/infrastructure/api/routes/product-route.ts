import express, { Request, Response } from "express";
import CreateProductImpl from "../../../usecase/product/create/create-product-impl";
import ListProductImpl from "../../../usecase/product/list/list-product-impl";
import ProductMapperImpl from "../../product/sequelize/mapper/product-mapper-impl";
import ProductRepositoryImpl from "../../product/sequelize/repository/product-repository-impl";
import { IdGeneratorImpl } from "../../_shared/utils/IdGeneratorImpl";
import ProductPresenter from "../presenters/product-presenter";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const idGenerator = new IdGeneratorImpl();
  const mapper = new ProductMapperImpl();
  const repository = new ProductRepositoryImpl(mapper);
  const useCase = new CreateProductImpl(idGenerator, repository);
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await useCase.create(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const mapper = new ProductMapperImpl();
  const repository = new ProductRepositoryImpl(mapper);
  const useCase = new ListProductImpl(repository);
  const output = await useCase.list({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(ProductPresenter.listXML(output)),
  });
});
