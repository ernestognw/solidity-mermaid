import { ErrorType, FormatError } from "@classes/errors/format";
import Indented from "./indented";

export default class Line extends Indented {
  private readonly _regex = /^.*$/g;
  private readonly _spaces = "  ";

  constructor(private _text: string = "", indentation = 0) {
    super(indentation);
    this._validate();
  }

  private set text(text: string) {
    this._text = text;
    this._validate();
  }

  get text() {
    return `${this._spaces.repeat(this.indentation)}${this._text}`;
  }

  concat(text: string) {
    // Intentionally muting the variable
    this.text = this._text.concat(text);

    return this;
  }

  private _validate() {
    if (!this.text.match(this._regex))
      throw new FormatError("Line can't contain newline", ErrorType.BadLine);
  }
}
