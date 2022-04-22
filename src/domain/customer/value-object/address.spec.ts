import Address from "./address";

describe("Address unit tests", () => {
  it("should throw error when street is empty", () => {
    expect(() => {
      const address = new Address("", 123, "13330-250", "São Paulo");
    }).toThrowError("Street is required");
  });

  it("should throw error when number less or equals zero", () => {
    expect(() => {
      const address = new Address("Street 1", 0, "13330-250", "São Paulo");
    }).toThrowError("Number is required");
  });

  it("should throw error when zip is empty", () => {
    expect(() => {
      const address = new Address("Street 1", 123, "", "São Paulo");
    }).toThrowError("Zip is required");
  });

  it("should throw error when city is empty", () => {
    expect(() => {
      const address = new Address("Street 1", 123, "13330-250", "");
    }).toThrowError("City is required");
  });

  it("should convert address to string correctly", () => {
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    expect(address.toString()).toBe("Street 1, 123, 13330-250 São Paulo");
  });
});
