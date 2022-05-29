import express, { Request, Response } from "express";
import CreateCustomerImpl from "../../../usecase/customer/create/create-customer-impl";
import ListCustomerImpl from "../../../usecase/customer/list/list-customer-impl";
import CustomerMapperImpl from "../../customer/sequelize/mapper/customer-mapper-impl";
import CustomerRepositoryImpl from "../../customer/sequelize/repository/customer-repository-impl";
import { IdGeneratorImpl } from "../../_shared/utils/IdGeneratorImpl";
import CustomerPresenter from "../presenters/customer-presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const idGenerator = new IdGeneratorImpl();
  const mapper = new CustomerMapperImpl();
  const repository = new CustomerRepositoryImpl(mapper);
  const useCase = new CreateCustomerImpl(idGenerator, repository);
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await useCase.create(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const mapper = new CustomerMapperImpl();
  const repository = new CustomerRepositoryImpl(mapper);
  const useCase = new ListCustomerImpl(repository);
  const output = await useCase.list({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.listXML(output)),
  });
});
