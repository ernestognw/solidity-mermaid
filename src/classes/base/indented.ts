export default class Indented {
  constructor(private _indentation = 0) {}

  protected get indentation() {
    return this._indentation;
  }

  indent() {
    this._indentation++;
  }

  unindent() {
    if (this._indentation > 0) this._indentation--;
  }
}
