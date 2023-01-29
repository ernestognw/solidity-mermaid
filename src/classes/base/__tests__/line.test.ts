import { expect } from "chai";
import Line from "../line";
import { shouldBehaveLikeIndented } from "./utils/indented.behavior";

function buildLine(indentation: number) {
  return new Line("", indentation);
}

describe(Line.name, function () {
  let line: Line;

  beforeEach(function () {
    line = buildLine(0);
  });

  shouldBehaveLikeIndented({
    initialIndentation: 0,
    build: buildLine,
  });

  describe("#constructor", function () {
    it("sets initial indentation", function () {
      const text = "Hello world";
      const line = new Line(text);
      expect(line.text).to.equal(text);
    });

    it("sets initial indentation", function () {
      const indentation = 12;
      const line = new Line("", indentation);
      expect(line["indentation"]).to.equal(indentation);
      expect(line.text).to.include(line["_spaces"].repeat(indentation));
    });

    it("should throw with newlines", function () {
      expect(() => new Line("\n")).to.throw("Line can't contain newline");
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
});
