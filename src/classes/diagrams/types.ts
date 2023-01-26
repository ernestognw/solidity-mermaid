import { Node, NodeType, NodeTypeMap } from "solidity-ast/node";

export type ASTProcessor = {
  [Key in NodeType as `process${Key}`]: (node: NodeTypeMap[Key]) => void;
};
