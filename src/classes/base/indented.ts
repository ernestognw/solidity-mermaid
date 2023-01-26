import { ErrorType, FormatError } from "@classes/errors/format-error";

export class Indented {
  constructor(private _indentation = 0) {}

  protected get indentation() {
    return this._indentation;
  }

  indent() {
    this._indentation++;
  }

  unindent() {
    if (this._indentation <= 0)
      throw new FormatError("Indentation can be < 0", ErrorType.BadIdentation);
    this._indentation--;
  }
}
