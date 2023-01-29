import Indented, { DEFAULT_INDENTATION } from "./indented";
import Line from "./line";

export default class Mermaid extends Indented {
  private _lines: Line[] = [];
  private _initialLines: Line[] = [];

  constructor(_indentation = DEFAULT_INDENTATION) {
    super(_indentation);
  }

  get lines() {
    return this._lines;
  }

  get text() {
    return this.lines.map(({ text }) => text).join("\n");
  }

  public push(text: string) {
    this._lines.push(new Line(text, this.indentation));
  }

  indentAll() {
    this.lines.forEach((line) => line.indent());
  }

  unindentAll() {
    this.lines.forEach((line) => line.unindent());
  }

  indent() {
    super.indent();
  }

  unindent() {
    super.unindent();
  }

  protected _reset() {
    super._reset();
    this._lines = this._initialLines;
  }

  protected set initialLines(lines: Line[]) {
    this._initialLines = lines;
  }
}
