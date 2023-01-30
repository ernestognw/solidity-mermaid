import { TypedError } from "@classes/errors/typed";
import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

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
    let stub: SinonStub;

    beforeEach(function () {
      stub = sinon.stub(console, "error");
    });

    afterEach(function () {
      stub.restore();
    });

    it("includes name", () => {
      const typedError = build("", "");
      typedError.print();
      expect(stub.calledOnce).to.be.true;
      expect(stub.firstCall.args[0]).to.include(typedError.name);
    });

    it("includes type", () => {
      const typedError = build("", "");
      typedError.print();
      expect(stub.calledOnce).to.be.true;
      expect(stub.firstCall.args[0]).to.include(typedError.type);
    });

    it("includes message", () => {
      const message = "Testing error";
      const typedError = build(message, "");
      typedError.print();
      expect(stub.calledOnce).to.be.true;
      expect(stub.firstCall.args[0]).to.include(message);
    });
  });
}
