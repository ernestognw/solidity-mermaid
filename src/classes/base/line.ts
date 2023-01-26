import { Indented } from "./indented";

export class Line extends Indented {
  constructor(private readonly _text: string, indentation: number) {
    super(indentation);
  }

  get text() {
    return `${`\t`.repeat(this.indentation)}${this._text}`;
  }
}
