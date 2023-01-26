import {
  ArrayTypeName,
  Assignment,
  BinaryOperation,
  Block,
  Break,
  Conditional,
  Continue,
  ContractDefinition,
  DoWhileStatement,
  ElementaryTypeName,
  ElementaryTypeNameExpression,
  EmitStatement,
  EnumDefinition,
  EnumValue,
  ErrorDefinition,
  EventDefinition,
  ExpressionStatement,
  ForStatement,
  FunctionCall,
  FunctionCallOptions,
  FunctionDefinition,
  FunctionTypeName,
  Identifier,
  IdentifierPath,
  IfStatement,
  ImportDirective,
  IndexAccess,
  IndexRangeAccess,
  InheritanceSpecifier,
  InlineAssembly,
  Literal,
  Mapping,
  MemberAccess,
  ModifierDefinition,
  ModifierInvocation,
  NewExpression,
  OverrideSpecifier,
  ParameterList,
  PlaceholderStatement,
  PragmaDirective,
  Return,
  RevertStatement,
  SourceUnit,
  StructDefinition,
  StructuredDocumentation,
  TryCatchClause,
  TryStatement,
  TupleExpression,
  UnaryOperation,
  UncheckedBlock,
  UserDefinedTypeName,
  UserDefinedValueTypeDefinition,
  UsingForDirective,
  VariableDeclaration,
  VariableDeclarationStatement,
  Visibility,
  WhileStatement,
} from "solidity-ast";
import { ASTProcessor } from "../types";
import { Class } from ".";
import { ASTDereferencer } from "solidity-ast/utils";
import { Node } from "solidity-ast/node";

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

  processSourceUnit(node: SourceUnit) {
    // TODO: Complete
  }

  processArrayTypeName(node: ArrayTypeName) {
    // TODO: Complete
  }

  processAssignment(node: Assignment) {
    // TODO: Complete
  }

  processBinaryOperation(node: BinaryOperation) {
    // TODO: Complete
  }

  processBlock(node: Block) {
    // TODO: Complete
  }

  processBreak(node: Break) {
    // TODO: Complete
  }

  processConditional(node: Conditional) {
    // TODO: Complete
  }

  processContinue(node: Continue) {
    // TODO: Complete
  }

  processContractDefinition(node: ContractDefinition) {
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

    this.processSubNodes(node.nodes);
    console.log(node.nodes);
    console.log(node.baseContracts);

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

    this.processSubNodes(node.baseContracts);
  }

  processDoWhileStatement(node: DoWhileStatement) {
    // TODO: Complete
  }

  processElementaryTypeName(node: ElementaryTypeName) {
    // TODO: Complete
  }

  processElementaryTypeNameExpression(node: ElementaryTypeNameExpression) {
    // TODO: Complete
  }

  processEmitStatement(node: EmitStatement) {
    // TODO: Complete
  }

  processEnumDefinition(node: EnumDefinition) {
    // TODO: Complete
  }

  processEnumValue(node: EnumValue) {
    // TODO: Complete
  }

  processErrorDefinition(node: ErrorDefinition) {
    // TODO: Complete
  }

  processEventDefinition(node: EventDefinition) {
    // TODO: Complete
  }

  processExpressionStatement(node: ExpressionStatement) {
    // TODO: Complete
  }

  processForStatement(node: ForStatement) {
    // TODO: Complete
  }

  processFunctionCall(node: FunctionCall) {
    // TODO: Complete
  }

  processFunctionCallOptions(node: FunctionCallOptions) {
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

    const name = node.name ?? node.kind;

    const processParameters = (parameters: VariableDeclaration[]): string =>
      parameters
        .map((parameter) => {
          const type = parameter.typeDescriptions.typeString;
          const storageLocation =
            parameter.storageLocation == "default"
              ? ""
              : parameter.storageLocation;
          const name = parameter.name;

          return [type, storageLocation, name].join(" ").replace(/  /g, " ");
        })
        .join(", ");

    const parameters = processParameters(node.parameters.parameters);
    const returnParameters = processParameters(
      node.returnParameters.parameters
    );

    const line = `${visibility}${name}(${parameters})`;
    if (returnParameters) line.concat(`: (${returnParameters})`);

    this.context.push(line);
  }

  processFunctionTypeName(node: FunctionTypeName) {
    // TODO: Complete
  }

  processIdentifier(node: Identifier) {
    // TODO: Complete
  }

  processIdentifierPath(node: IdentifierPath) {
    // TODO: Complete
  }

  processIfStatement(node: IfStatement) {
    // TODO: Complete
  }

  processImportDirective(node: ImportDirective) {
    // TODO: Complete
  }

  processIndexAccess(node: IndexAccess) {
    // TODO: Complete
  }

  processIndexRangeAccess(node: IndexRangeAccess) {
    // TODO: Complete
  }

  processInheritanceSpecifier(node: InheritanceSpecifier) {
    // TODO: Complete
  }

  processInlineAssembly(node: InlineAssembly) {
    // TODO: Complete
  }

  processLiteral(node: Literal) {
    // TODO: Complete
  }

  processMapping(node: Mapping) {
    // TODO: Complete
  }

  processMemberAccess(node: MemberAccess) {
    // TODO: Complete
  }

  processModifierDefinition(node: ModifierDefinition) {
    // TODO: Complete
  }

  processModifierInvocation(node: ModifierInvocation) {
    // TODO: Complete
  }

  processNewExpression(node: NewExpression) {
    // TODO: Complete
  }

  processOverrideSpecifier(node: OverrideSpecifier) {
    // TODO: Complete
  }

  processParameterList(node: ParameterList) {
    // TODO: Complete
  }

  processPlaceholderStatement(node: PlaceholderStatement) {
    // TODO: Complete
  }

  processPragmaDirective(node: PragmaDirective) {
    // TODO: Complete
  }

  processReturn(node: Return) {
    // TODO: Complete
  }

  processRevertStatement(node: RevertStatement) {
    // TODO: Complete
  }

  processStructDefinition(node: StructDefinition) {
    // TODO: Complete
  }

  processStructuredDocumentation(node: StructuredDocumentation) {
    // TODO: Complete
  }

  processTryCatchClause(node: TryCatchClause) {
    // TODO: Complete
  }

  processTryStatement(node: TryStatement) {
    // TODO: Complete
  }

  processTupleExpression(node: TupleExpression) {
    // TODO: Complete
  }

  processUnaryOperation(node: UnaryOperation) {
    // TODO: Complete
  }

  processUncheckedBlock(node: UncheckedBlock) {
    // TODO: Complete
  }

  processUserDefinedTypeName(node: UserDefinedTypeName) {
    // TODO: Complete
  }

  processUserDefinedValueTypeDefinition(node: UserDefinedValueTypeDefinition) {
    // TODO: Complete
  }

  processUsingForDirective(node: UsingForDirective) {
    // TODO: Complete
  }

  processVariableDeclaration(node: VariableDeclaration) {
    // TODO: Complete
  }

  processVariableDeclarationStatement(node: VariableDeclarationStatement) {
    // TODO: Complete
  }

  processWhileStatement(node: WhileStatement) {
    // TODO: Complete
  }

  private processSubNodes(nodes: Node[]) {
    for (const subnode of nodes) {
      this[`process${subnode.nodeType}`](subnode as any); // TODO: Fix
    }
  }
}
