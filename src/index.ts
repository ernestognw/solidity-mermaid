import { Class } from "@classes/diagrams/class";
import { SolcOutput } from "solidity-ast/solc";
import ERC20Ouput from "./ERC20Output.json";

const classDiagram = new Class(
  ERC20Ouput as SolcOutput,
  "ContractDefinition",
  3501
);

classDiagram.print();
