import Indented from "../indented";
import { shouldBehaveLikeIndented } from "./utils/indented.behavior";

function build(indentation: number) {
  return new Indented(indentation);
}

describe(Indented.name, function () {
  shouldBehaveLikeIndented({
    initialIndentation: 0,
    build,
  });
});
