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

  processSourceUnit() {
    // TODO: Complete
  }

  processArrayTypeName() {
    // TODO: Complete
  }

  processAssignment() {
    // TODO: Complete
  }

  processBinaryOperation() {
    // TODO: Complete
  }

  processBlock() {
    // TODO: Complete
  }

  processBreak() {
    // TODO: Complete
  }

  processConditional() {
    // TODO: Complete
  }

  processContinue() {
    // TODO: Complete
  }

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

    // Possible interest list:
    // | EnumDefinition
    // | ErrorDefinition
    // | EventDefinition
    // | FunctionDefinition
    // | ModifierDefinition
    // | StructDefinition
    // | UserDefinedValueTypeDefinition
    // | UsingForDirective
    // | VariableDeclaration

    this.context.unindent();
    this.context.push("}");
    this.context.push("");

    this.processSubNodes(node.baseContracts, { parent: node });
  }

  processDoWhileStatement() {
    // No plans for this
  }

  processElementaryTypeName() {
    // TODO: Complete
  }

  processElementaryTypeNameExpression() {
    // TODO: Complete
  }

  processEmitStatement() {
    // No plans for this
  }

  processEnumDefinition() {
    // TODO: Complete
  }

  processEnumValue() {
    // TODO: Complete
  }

  processErrorDefinition() {
    // TODO: Complete
  }

  processEventDefinition() {
    // TODO: Complete
  }

  processExpressionStatement() {
    // TODO: Complete
  }

  processForStatement() {
    // TODO: Complete
  }

  processFunctionCall() {
    // TODO: Complete
  }

  processFunctionCallOptions() {
    // TODO: Complete
  }

  processFunctionDefinition(node: FunctionDefinition) {
    const visibilityMap: Record<Visibility, string> = {
      public: "+",
      external: "#", // Using Mermaid protected since there's no external
      internal: "~",
      private: "-",
    };

    const visibility = visibilityMap[node.visibility];

    const name = node.name || node.kind;

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

  processFunctionTypeName() {
    // TODO: Complete
  }

  processIdentifier() {
    // TODO: Complete
  }

  processIdentifierPath() {
    // TODO: Complete
  }

  processIfStatement() {
    // TODO: Complete
  }

  processImportDirective() {
    // TODO: Complete
  }

  processIndexAccess() {
    // TODO: Complete
  }

  processIndexRangeAccess() {
    // TODO: Complete
  }

  processInheritanceSpecifier(
    node: InheritanceSpecifier,
    options: ProcessOptions
  ) {
    const inheritFrom = this.dereferencer(
      "ContractDefinition", // TODO: Verify what happens for ContractDefinition
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

  processInlineAssembly() {
    // TODO: Complete
  }

  processLiteral() {
    // TODO: Complete
  }

  processMapping() {
    // TODO: Complete
  }

  processMemberAccess() {
    // TODO: Complete
  }

  processModifierDefinition() {
    // TODO: Complete
  }

  processModifierInvocation() {
    // TODO: Complete
  }

  processNewExpression() {
    // TODO: Complete
  }

  processOverrideSpecifier() {
    // TODO: Complete
  }

  processParameterList() {
    // TODO: Complete
  }

  processPlaceholderStatement() {
    // TODO: Complete
  }

  processPragmaDirective() {
    // TODO: Complete
  }

  processReturn() {
    // TODO: Complete
  }

  processRevertStatement() {
    // TODO: Complete
  }

  processStructDefinition() {
    // TODO: Complete
  }

  processStructuredDocumentation() {
    // Not used at the moment but might be useful with notes
    // See https://mermaid.js.org/syntax/classDiagram.html#notes
  }

  processTryCatchClause() {
    // TODO: Complete
  }

  processTryStatement() {
    // TODO: Complete
  }

  processTupleExpression() {
    // TODO: Complete
  }

  processUnaryOperation() {
    // TODO: Complete
  }

  processUncheckedBlock() {
    // TODO: Complete
  }

  processUserDefinedTypeName() {
    // TODO: Complete
  }

  processUserDefinedValueTypeDefinition() {
    // TODO: Complete
  }

  processUsingForDirective() {
    // TODO: Complete
  }

  processVariableDeclaration() {
    // TODO: Complete
  }

  processVariableDeclarationStatement() {
    // TODO: Complete
  }

  processWhileStatement() {
    // TODO: Complete
  }

  private processSubNodes(nodes: Node[], options: ProcessOptions) {
    for (const subnode of nodes) {
      this.processNode(subnode, options);
    }
  }

  private processNode(node: Node, options: ProcessOptions) {
    // Couldn't find a way to successfully execute this. Failed.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this[`process${node.nodeType}`](node as any, options);
  }

  private comment(message: string) {
    this.context.push(`%% ${message}`);
  }
}
