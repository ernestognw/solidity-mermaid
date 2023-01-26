import { ErrorType, FormatError } from "@classes/errors/format-error";
import { Indented } from "./indented";
import { Line } from "./line";

export class Mermaid extends Indented {
  protected _lines: Line[] = [];
  private readonly _regex = /^.*$/g;

  constructor() {
    super();
    this._lines.push(new Line("classDiagram", this.indentation));
  }

  get lines() {
    return this._lines;
  }

  get text() {
    return this.lines.toString();
  }

  protected push(text: string) {
    if (!this._regex.test(text))
      throw new FormatError("Line can't contain newline", ErrorType.BadLine);

    this._lines.push(new Line(text, this.indentation));
  }

  indent() {
    this.lines.forEach((line) => line.indent());
  }

  unindent() {
    this.lines.forEach((line) => line.unindent());
  }
}
