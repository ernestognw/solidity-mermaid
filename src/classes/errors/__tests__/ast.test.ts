import { ErrorType, ASTError } from "../ast";
import { shouldBehaveLikeTypedError } from "./utils/typed.behavior";

describe("ASTError", () => {
  shouldBehaveLikeTypedError({
    build: (message, type) => new ASTError(message, type as ErrorType),
  });
});
