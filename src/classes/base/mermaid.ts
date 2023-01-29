import Indented from "./indented";
import Line from "./line";

export default class Mermaid extends Indented {
  protected _lines: Line[] = [];

  constructor(_indentation = 0) {
    super(_indentation);
  }

  get lines() {
    return this._lines;
  }

  get text() {
    return this.lines.join("\n");
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
}
