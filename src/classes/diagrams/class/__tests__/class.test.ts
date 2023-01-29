import Class from "../";
import { shouldBehaveLikeMermaid } from "@classes/base/__tests__/utils/mermaid.behavior";
import ERC721Output from "@/ERC721Output.json";
import { SolcOutput } from "solidity-ast/solc";

function buildClass(indentation: number) {
  return new Class(
    ERC721Output as SolcOutput,
    "ContractDefinition",
    2787,
    indentation
  );
}

describe(Class.name, function () {
  shouldBehaveLikeMermaid({
    initialIndentation: 1,
    initialLines: 1,
    build: buildClass,
  });
});
