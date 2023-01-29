import Mermaid from "../mermaid";
import { shouldBehaveLikeMermaid } from "./utils/mermaid.behavior";

function buildMermaid(indentation?: number) {
  return new Mermaid(indentation);
}

describe(Mermaid.name, function () {
  shouldBehaveLikeMermaid({
    initialIndentation: 0,
    build: buildMermaid,
  });
});
