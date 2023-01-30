import Class from "../";
import { shouldBehaveLikeMermaid } from "@classes/base/__tests__/utils/mermaid.behavior";
import ERC721Output from "@/ERC721Output.json";
import { SolcOutput } from "solidity-ast/solc";
import { NodeType } from "solidity-ast/node";
import { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import { astDereferencer } from "solidity-ast/utils";
import Processor from "../processor";

function buildClass(
  solcOuput: SolcOutput,
  nodeType: NodeType,
  id: number,
  indentation?: number
) {
  return new Class(solcOuput, nodeType, id, indentation);
}

describe(Class.name, function () {
  const solcOuput = ERC721Output as SolcOutput;
  const nodeType = "ContractDefinition";
  const id = 2787;

  beforeEach(function () {
    this.classDiagram = buildClass(solcOuput, nodeType, id, 0);
  });

  shouldBehaveLikeMermaid({
    initialIndentation: 1,
    build: (indentation) => buildClass(solcOuput, nodeType, id, indentation),
  });

  describe("#constructor", function () {
    it("sets node", function () {
      const dereference = astDereferencer(solcOuput);
      expect(this.classDiagram.node).to.equal(dereference(nodeType, id));
    });

    it("sets processor", function () {
      expect(this.classDiagram.processor).to.be.instanceOf(Processor);
    });

    it("sets processor with Class context", function () {
      expect(this.classDiagram.processor.context).to.be.equal(
        this.classDiagram
      );
    });

    it("sets processor with dereferencer", function () {
      expect(this.classDiagram.processor.dereferencer).to.be.instanceOf(
        Function
      );
    });
  });

  describe("+processed", function () {
    it("process AST into text", function () {
      const initialText = this.classDiagram.text;
      expect(this.classDiagram.processed.length).to.be.greaterThan(
        initialText.length
      );
    });

    it("is idempotent", function () {
      const text = this.classDiagram.text;
      new Array(10)
        .fill({})
        .forEach(() => expect(this.classDiagram.text).to.be.equal(text));
    });
  });

  describe("+print", function () {
    let stub: SinonStub;

    beforeEach(function () {
      stub = sinon.stub(console, "log");
    });

    afterEach(function () {
      stub.restore();
    });

    it("prints processed text", function () {
      const text = this.classDiagram.processed;
      this.classDiagram.print();
      expect(stub.calledOnce).to.be.true;
      expect(stub.firstCall.args[0]).to.equal(text);
    });
  });
});
