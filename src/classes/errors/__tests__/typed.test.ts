import { expect } from "chai";
import { TypedError } from "../typed";

enum TestTypes {
  A,
}

describe("TypedError", () => {
  describe("constructor", () => {
    it("sets message", () => {
      const message = "Hello world";
      expect(new TypedError(message, "").message).to.equal(message);
    });

    it("sets type", () => {
      expect(new TypedError("", TestTypes.A).type).to.equal(TestTypes.A);
    });
  });

  describe("print", () => {
    it("includes name", () => {
      const typedError = new TypedError("", "");
      expect(typedError.print()).to.include(typedError.name);
    });

    it("includes type", () => {
      const typedError = new TypedError("", "");
      expect(typedError.print()).to.include(typedError.type);
    });

    it("includes message", () => {
      const message = "Testing error";
      const typedError = new TypedError(message, "");
      expect(typedError.print()).to.include(message);
    });
  });
});
