import { expect } from "chai";
import Line from "../line";

describe("Line", () => {
  let line: Line;

  beforeEach(() => {
    line = new Line();
  });

  describe("constructor", () => {
    it("sets initial indentation", () => {
      const text = "Hello world";
      const line = new Line(text);
      expect(line.text).to.equal(text);
    });

    it("sets initial indentation", () => {
      const indentation = 12;
      const line = new Line("", indentation);
      expect(line["indentation"]).to.equal(indentation);
      expect(line.text).to.include(line["_spaces"].repeat(indentation));
    });

    it("should throw with newlines", () => {
      expect(() => new Line("\n")).to.throw("Line can't contain newline");
    });
  });

  describe("concat", () => {
    it("should add to text", () => {
      const text = "Hello world";
      line.concat(text);
      expect(line.text).to.equal(text);
    });

    it("should allow to chain calls", () => {
      line.concat("1").concat(" ").concat("1");
      expect(line.text).to.equal("1 1");
    });

    it("should throw with newlines", () => {
      expect(line.concat.bind(line, "\n")).to.throw(
        "Line can't contain newline"
      );
    });
  });
});
