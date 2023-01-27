import { TypedError } from "./typed";

export enum ErrorType {
  BadParent = "BadParent",
}

export class ASTError extends TypedError<ErrorType> {
  constructor(message: string, type: ErrorType) {
    super(message, type);
  }
}
