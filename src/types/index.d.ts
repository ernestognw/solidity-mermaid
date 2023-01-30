import { Node, NodeType, NodeTypeMap } from "solidity-ast/node";

export type ProcessOptions = {
  parent: Node;
};

export type ProcessorKey<T extends string> = `process${T}`;

export type Process<K extends NodeType> = (
  node: NodeTypeMap[K],
  options: ProcessOptions
) => void;

export type ASTProcessor = {
  [Key in NodeType as ProcessorKey<Key>]: Process<Key>;
};
