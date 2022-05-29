import { v4 as uuid } from "uuid";
import IdGenerator from "../../../domain/_shared/utils/id-generator";

export class IdGeneratorImpl implements IdGenerator {
  public generate(): Promise<string> {
    return Promise.resolve(uuid());
  }
}
