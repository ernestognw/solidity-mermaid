export const DEFAULT_INDENTATION = 0;

export default class Indented {
  private _initialIndentation: number;

  constructor(private _indentation = DEFAULT_INDENTATION) {
    this._initialIndentation = 0;
  }

  public get indentation() {
    return this._indentation;
  }

  indent() {
    this._indentation++;
  }

  unindent() {
    if (this._indentation > 0) this._indentation--;
  }

  protected _reset() {
    this._indentation = this._initialIndentation;
  }

  protected set initialIndentation(indentation: number) {
    this._initialIndentation = indentation;
  }
}
