import { ErrorType, FormatError } from "@classes/errors/format";
import Indented from "./indented";

export default class Line extends Indented {
  private readonly _regex = /^.*$/g;

  constructor(private readonly _text: string, indentation: number) {
    super(indentation);
    if (!this._regex.test(this.text)) {
      throw new FormatError("Line can't contain newline", ErrorType.BadLine);
    }
  }

  get text() {
    return `${`  `.repeat(this.indentation)}${this._text}`;
  }
}
