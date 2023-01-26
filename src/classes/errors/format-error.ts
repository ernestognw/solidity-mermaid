export enum ErrorType {
  BadIdentation = "BadIdentation",
  BadLine = "BadLine",
}

export class FormatError extends Error {
  private readonly _type;

  constructor(message: string, type: ErrorType) {
    super(message);
    this.name = this.constructor.name;
    this._type;
  }
}
