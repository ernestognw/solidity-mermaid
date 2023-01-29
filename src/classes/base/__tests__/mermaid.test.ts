import Mermaid from "../mermaid";
import { shouldBehaveLikeMermaid } from "./utils/mermaid.behavior";

function buildMermaid(indentation: number) {
  return new Mermaid(indentation);
}

describe(`is ${Mermaid.name}`, function () {
  shouldBehaveLikeMermaid({
    initialIndentation: 0,
    initialLines: 0,
    build: buildMermaid,
  });
});
