import {
  ContractDefinition,
  FunctionDefinition,
  InheritanceSpecifier,
  VariableDeclaration,
  Visibility,
} from "solidity-ast";
import { ASTProcessor, ProcessOptions } from "@classes/diagrams/types";
import { Class } from ".";
import { ASTDereferencer, isNodeType } from "solidity-ast/utils";
import { Node } from "solidity-ast/node";
import { ASTError, ErrorType } from "@classes/errors/ast";
import Line from "@classes/base/line";

export default class Processor implements ASTProcessor {
  constructor(
    private _context: Class,
    private _dereferencer: ASTDereferencer
  ) {}

  get dereferencer() {
    return this._dereferencer;
  }

  get context() {
    return this._context;
  }

  process(node: Node) {
    this.processNode(node, {
      parent: {} as Node, // No parent
    });
  }

  // Explicitly skipped.
  // See: https://github.com/ernestognw/solidity-mermaid/issues/16
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processSourceUnit() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/11
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processArrayTypeName() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processAssignment() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processBinaryOperation() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processBlock() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processBreak() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processConditional() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processContinue() {}

  processContractDefinition(node: ContractDefinition) {
    if (node.documentation)
      this.processSubNodes([node.documentation], { parent: node });

    this.comment(`${node.src}`);
    this.context.push(`class ${node.name} {`);
    this.context.indent();

    switch (node.contractKind) {
      case "contract":
        this.context.push("<<Contract>>");
        break;
      case "interface":
        this.context.push("<<Interface>>");
        break;
      case "library":
        this.context.push("<<Library>>");
    }

    this.processSubNodes(node.nodes, { parent: node });

    this.context.unindent();
    this.context.push("}");
    this.context.push("");

    this.processSubNodes(node.baseContracts, { parent: node });
  }

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processDoWhileStatement() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/11
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processElementaryTypeName() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/11
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processElementaryTypeNameExpression() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processEmitStatement() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/15
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processEnumDefinition() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/15
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processEnumValue() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/14
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processErrorDefinition() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/13
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processEventDefinition() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processExpressionStatement() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processForStatement() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processFunctionCall() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processFunctionCallOptions() {}

  processFunctionDefinition(node: FunctionDefinition) {
    const visibilityMap: Record<Visibility, string> = {
      public: "+",
      external: "#", // Using Mermaid protected since there's no external
      internal: "~",
      private: "-",
    };

    const visibility = visibilityMap[node.visibility];

    const name = node.name || node.kind;

    // Should we handle this in `procesParameterList`?
    // See  https://github.com/ernestognw/solidity-mermaid/issues/7
    const processParameters = (parameters: VariableDeclaration[]): string =>
      parameters
        .map((parameter) => {
          const line = new Line();

          const type = parameter.typeDescriptions.typeString;
          if (type) line.concat(type).concat(" ");

          if (parameter.storageLocation != "default")
            line.concat(parameter.storageLocation).concat(" ");

          line.concat(parameter.name).concat(" ");

          return line.text.trim();
        })
        .join(", ");

    const parameters = processParameters(node.parameters.parameters);
    const returnParameters = processParameters(
      node.returnParameters.parameters
    );

    const line = new Line(`${visibility}${name}(${parameters})`);

    if (returnParameters) line.concat(`: (${returnParameters})`);
    if (!node.implemented) line.concat(`$`); // For representing virtual

    this.context.push(line.text);
  }

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/11
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processFunctionTypeName() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processIdentifier() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processIdentifierPath() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processIfStatement() {}

  // Explicitly skipped.
  // See: https://github.com/ernestognw/solidity-mermaid/issues/12
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processImportDirective() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processIndexAccess() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processIndexRangeAccess() {}

  processInheritanceSpecifier(
    node: InheritanceSpecifier,
    options: ProcessOptions
  ) {
    const inheritFrom = this.dereferencer(
      // Verify other cases for
      // TODO: https://github.com/ernestognw/solidity-mermaid/issues/4
      "ContractDefinition",
      node.baseName.referencedDeclaration
    );

    if (!isNodeType("ContractDefinition", options.parent))
      throw new ASTError(
        "Parent of InheritanceSpecifier can only be ContractDefinition",
        ErrorType.BadParent
      );

    this.context.push(`${options.parent.name} --|> ${inheritFrom.name}`);
    this.context.push("");
    this.processSubNodes([inheritFrom], { parent: node });
  }

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processInlineAssembly() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processLiteral() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/11
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processMapping() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processMemberAccess() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processModifierDefinition() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processModifierInvocation() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/10
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processNewExpression() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/9
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processOverrideSpecifier() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/7
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processParameterList() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processPlaceholderStatement() {}

  // Explicitly skipped.
  // See: https://github.com/ernestognw/solidity-mermaid/issues/6
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processPragmaDirective() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processReturn() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processRevertStatement() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/8
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processStructDefinition() {}

  // Explicitly skipped.
  // See: https://github.com/ernestognw/solidity-mermaid/issues/5
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processStructuredDocumentation() {
    // See https://mermaid.js.org/syntax/classDiagram.html#notes
  }

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processTryCatchClause() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processTryStatement() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processTupleExpression() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processUnaryOperation() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processUncheckedBlock() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/4
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processUserDefinedTypeName() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/4
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processUserDefinedValueTypeDefinition() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/3
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processUsingForDirective() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/2
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processVariableDeclaration() {}

  // TODO: https://github.com/ernestognw/solidity-mermaid/issues/2
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processVariableDeclarationStatement() {}

  // Explicitly skipped.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processWhileStatement() {}

  private processSubNodes(nodes: Node[], options: ProcessOptions) {
    for (const subnode of nodes) {
      this.processNode(subnode, options);
    }
  }

  private processNode(node: Node, options: ProcessOptions) {
    // Couldn't find a way to successfully execute this. Failed.
    // TODO: https://github.com/ernestognw/solidity-mermaid/issues/1
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this[`process${node.nodeType}`](node as any, options);
  }

  private comment(message: string) {
    this.context.push(`%% ${message}`);
  }
}
