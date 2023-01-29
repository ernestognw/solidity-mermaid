import { expect } from "chai";
import Line from "../line";
import { shouldBehaveLikeIndented } from "./utils/indented.behavior";

function buildLine(text?: string, indentation?: number) {
  return new Line(text, indentation);
}

describe(Line.name, function () {
  let line: Line;

  beforeEach(function () {
    line = buildLine("", 0);
  });

  shouldBehaveLikeIndented({
    initialIndentation: 0,
    build: (indentation) => buildLine("", indentation),
  });

  describe("#constructor", function () {
    it("sets empty text with 0 indentation by deafault", function () {
      const line = buildLine();
      expect(line.text).to.equal("");
      expect(line["indentation"]).to.equal(0);
    });

    it("sets initial text", function () {
      const text = "Hello world";
      const line = buildLine(text);
      expect(line.text).to.equal(text);
    });

    it("sets initial indentation", function () {
      const indentation = 12;
      const line = buildLine("", indentation);
      expect(line["indentation"]).to.equal(indentation);
      expect(line.text).to.include(line["_spaces"].repeat(indentation));
    });

    it("should throw with newlines", function () {
      expect(() => buildLine("\n")).to.throw("Line can't contain newline");
    });
  });

  describe("+concat", function () {
    it("should add to text", function () {
      const text = "Hello world";
      line.concat(text);
      expect(line.text).to.equal(text);
    });

    it("should allow to chain calls", function () {
      line.concat("1").concat(" ").concat("1");
      expect(line.text).to.equal("1 1");
    });

    it("should throw with newlines", function () {
      expect(line.concat.bind(line, "\n")).to.throw(
        "Line can't contain newline"
      );
    });
  });

  describe("-_reset", function () {
    it("should go back to initial state", function () {
      line.concat("This should be removed");
      const expected = "Test reset";
      line["initialText"] = expected;
      line["_reset"]();
      expect(line["_text"]).to.equal(expected);
    });
  });
});
