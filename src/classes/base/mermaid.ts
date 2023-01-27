import Indented from "./indented";
import Line from "./line";

export default class Mermaid extends Indented {
  protected _lines: Line[] = [];

  get lines() {
    return this._lines;
  }

  get text() {
    return this.lines.toString();
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
}
