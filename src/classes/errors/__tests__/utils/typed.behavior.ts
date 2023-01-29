import { TypedError } from "@classes/errors/typed";
import { expect } from "chai";

interface BehaveLikeTypedErrorParams {
  build<T extends ConstructorParameters<typeof TypedError>>(
    ...args: T
  ): TypedError<T[1]>;
}

enum TestTypes {
  A,
}

export function shouldBehaveLikeTypedError({
  build,
}: BehaveLikeTypedErrorParams) {
  describe("#constructor", () => {
    it("sets message", () => {
      const message = "Hello world";
      expect(new TypedError(message, "").message).to.equal(message);
    });

    it("sets type", () => {
      expect(build("", TestTypes.A).type).to.equal(TestTypes.A);
    });
  });

  describe("+print", () => {
    it("includes name", () => {
      const typedError = build("", "");
      expect(typedError.print()).to.include(typedError.name);
    });

    it("includes type", () => {
      const typedError = build("", "");
      expect(typedError.print()).to.include(typedError.type);
    });

    it("includes message", () => {
      const message = "Testing error";
      const typedError = build(message, "");
      expect(typedError.print()).to.include(message);
    });
  });
}
