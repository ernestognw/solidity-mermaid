import { expect } from "chai";
import Mermaid from "../mermaid";

describe("Mermaid", () => {
  let mermaid: Mermaid;

  beforeEach(() => {
    mermaid = new Mermaid();
  });

  function push(mermaid: Mermaid, times: number) {
    const length = times;
    for (let i = 0; i < length; i++) mermaid.push("Hello world");
  }

  const pushes = new Array(5).fill("").map((_, index) => 2 ** index);

  describe("push", () => {
    pushes.forEach((lines) => {
      it(`Adds ${lines} new lines`, () => {
        push(mermaid, lines);
        expect(mermaid["_lines"].length).to.equal(lines);
      });
    });

    pushes.forEach((indentation) => {
      it(`Add current identation to line (${indentation})`, () => {
        mermaid["_indentation"] = indentation;
        mermaid.push("Test");
        expect(mermaid["_lines"][0]["_indentation"]).to.equal(indentation);
      });
    });
  });

  describe("indentAll", () => {
    beforeEach(() => {
      mermaid.indentAll();
    });

    function checkAllIndentations(mermaid: Mermaid, expected: number) {
      mermaid["_lines"].forEach((line) =>
        expect(line["_indentation"]).to.equal(expected)
      );
    }

    it("Indents all of the lines", () => {
      let current = mermaid["_indentation"];
      checkAllIndentations(mermaid, current);
      mermaid.indentAll();
      checkAllIndentations(mermaid, ++current);
    });

    it("Unindents all of the lines", () => {
      let current = mermaid["_indentation"];
      checkAllIndentations(mermaid, current);
      mermaid.indentAll();
      checkAllIndentations(mermaid, --current);
    });
  });
});
