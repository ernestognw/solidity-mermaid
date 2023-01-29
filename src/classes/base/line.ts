import { ErrorType, FormatError } from "@classes/errors/format";
import Indented, { DEFAULT_INDENTATION } from "./indented";

export const DEFAULT_TEXT = "";

export default class Line extends Indented {
  private readonly _regex = /^.*$/g;
  private readonly _spaces = "  ";

  private _initialText: string;

  constructor(private _text = DEFAULT_TEXT, indentation = DEFAULT_INDENTATION) {
    super(indentation);
    this._initialText = _text;
    this.text = _text; // Explicit so `_validate` runs
  }

  private set text(text: string) {
    this._text = text;
    this._validate();
  }

  get text() {
    return `${this._spaces.repeat(this.indentation)}${this._text}`;
  }

  concat(text: string) {
    // Intentionally muting the variable so it's validated
    this.text = this._text.concat(text);

    return this;
  }

  private _validate() {
    if (!this.text.match(this._regex))
      throw new FormatError("Line can't contain newline", ErrorType.BadLine);
  }

  protected _reset() {
    super._reset();
    this._text = this._initialText;
  }

  protected set initialText(text: string) {
    this._initialText = text;
  }
}
