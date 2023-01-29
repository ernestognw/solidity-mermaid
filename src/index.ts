import Class from "@classes/diagrams/class";
import { writeFileSync } from "fs";
import { join } from "path";
import { SolcOutput } from "solidity-ast/solc";
import { findAll } from "solidity-ast/utils";
import ERC721Output from "./ERC721Output.json";

for (const [, { ast }] of Object.entries(
  (ERC721Output as SolcOutput).sources
)) {
  for (const typeDef of findAll(["ContractDefinition"], ast)) {
    const classDiagram = new Class(
      ERC721Output as SolcOutput,
      "ContractDefinition",
      typeDef.id
    );

    writeFileSync(
      join(__dirname, "out", `${typeDef.name}.mermaid`),
      classDiagram.text
    );
  }
}
