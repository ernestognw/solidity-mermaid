import Class from "@classes/diagrams/class";
import { SolcOutput } from "solidity-ast/solc";
import ERC721Output from "./ERC721Output.json";

const classDiagram = new Class(
  ERC721Output as SolcOutput,
  "ContractDefinition",
  2787
);

classDiagram.print();
