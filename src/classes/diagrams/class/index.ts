import Mermaid from "@classes/base/mermaid";
import { Node, NodeType } from "solidity-ast/node";
import { SolcOutput } from "solidity-ast/solc";
import { astDereferencer } from "solidity-ast/utils";
import Processor from "./processor";

export default class Class extends Mermaid {
  private readonly _node: Node;
  private _processor: Processor;

  constructor(
    _solcOutput: SolcOutput,
    nodeType: NodeType,
    id: number,
    initialIndentation?: number
  ) {
    super(initialIndentation);

    const dereference = astDereferencer(_solcOutput);
    this._node = dereference(nodeType, id);
    this._processor = new Processor(this, dereference);

    super.push("classDiagram");
    this.indent();
  }

  get node() {
    return this._node;
  }

  get processor() {
    return this._processor;
  }

  unindentAll() {
    super.unindentAll();
  }

  indentAll() {
    super.indentAll();
  }

  push(text: string) {
    super.push(text);
  }

  print() {
    this._process(this._node);
    console.log(this.lines.map((line) => line.text).join("\n"));
  }

  private _process(node: Node) {
    this.processor.process(node);
  }
}
