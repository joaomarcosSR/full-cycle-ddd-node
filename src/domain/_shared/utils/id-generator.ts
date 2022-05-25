export default interface IdGenerator {
  generate(): Promise<string>;
}
