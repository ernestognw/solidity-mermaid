import { TypedError } from "./typed";

export enum ErrorType {
  BadIdentation = "BadIdentation",
  BadLine = "BadLine",
}

export class FormatError extends TypedError<ErrorType> {
  constructor(message: string, type: ErrorType) {
    super(message, type);
  }
}
