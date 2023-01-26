import { Mermaid } from "@classes/base/mermaid";
import { Node, NodeType } from "solidity-ast/node";
import { SolcOutput } from "solidity-ast/solc";
import { astDereferencer } from "solidity-ast/utils";

export class Class extends Mermaid {
  private readonly _node: Node;

  constructor(_solcOutput: SolcOutput, nodeType: NodeType, id: number) {
    super();
    this._node = astDereferencer(_solcOutput)(nodeType, id);
  }

  get node() {
    return this._node;
  }

  print() {
    console.log(this.node);
  }
}
