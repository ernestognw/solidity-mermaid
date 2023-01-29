import { TypedError } from "./typed";

export enum ErrorType {
  BadLine = "BadLine",
}

export class FormatError extends TypedError<ErrorType> {
  constructor(message: string, type: ErrorType) {
    super(message, type);
  }
}
