import { ErrorType, FormatError } from "../format";
import { shouldBehaveLikeTypedError } from "./utils/typed.behavior";

describe("FormatError", () => {
  shouldBehaveLikeTypedError({
    build: (message, type) => new FormatError(message, type as ErrorType),
  });
});
