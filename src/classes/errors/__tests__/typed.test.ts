import { TypedError } from "../typed";
import { shouldBehaveLikeTypedError } from "./utils/typed.behavior";

describe("TypedError", () => {
  shouldBehaveLikeTypedError({
    build: (message, type) => new TypedError(message, type),
  });
});
