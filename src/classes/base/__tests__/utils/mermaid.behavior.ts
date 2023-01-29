import Mermaid from "@classes/base/mermaid";
import { expect } from "chai";
import {
  BehaveLikeIntendedParams,
  shouldBehaveLikeIndented,
} from "./indented.behavior";

interface BehaveLikeMermaidParams extends BehaveLikeIntendedParams {
  initialLines: number;
}

export function shouldBehaveLikeMermaid({
  initialLines = 0,
  initialIndentation = 0,
  build,
}: BehaveLikeMermaidParams) {
  describe(`extends ${Mermaid.name}`, () => {
    beforeEach(function () {
      this.mermaid = build(0);
    });

    shouldBehaveLikeIndented({
      initialIndentation,
      build,
    });

    function push(mermaid: Mermaid, times: number) {
      for (let i = 0; i < times; i++) mermaid.push("Hello world");
    }

    const pushes = new Array(5).fill("").map((_, index) => 2 ** index);

    describe("#constructor", function () {
      pushes.forEach((lines) => {
        it(`Adds ${lines} new lines`, function () {
          push(this.mermaid, lines);
          expect(this.mermaid.lines.length).to.equal(initialLines + lines);
        });
      });

      pushes.forEach((indentation) => {
        it(`Add current indentation to line (${indentation})`, function () {
          this.mermaid["_indentation"] = indentation;
          this.mermaid.push("Test");
          expect(this.mermaid.lines[initialLines]["_indentation"]).to.equal(
            indentation
          );
        });
      });
    });

    describe("+indentAll", function () {
      beforeEach(function () {
        push(this.mermaid, 10);
      });

      it("Indents all of the lines", function () {
        const currents = this.mermaid.lines.map(
          ({ _indentation }) => _indentation
        );
        this.mermaid.indentAll();
        this.mermaid.lines.forEach((line, i) =>
          expect(line["_indentation"]).to.equal(currents[i] + 1)
        );
      });
    });

    describe("+unindentAll", function () {
      beforeEach(function () {
        push(this.mermaid, 10);
      });
      it("Unindents all of the lines", function () {
        this.mermaid.indentAll(); // So unindent is not skipped
        const currents = this.mermaid.lines.map(
          ({ _indentation }) => _indentation
        );
        this.mermaid.unindentAll();
        this.mermaid.lines.forEach((line, i) =>
          expect(line["_indentation"]).to.equal(currents[i] - 1)
        );
      });
    });

    describe("+text", function () {
      pushes.forEach((lines) => {
        it(`Print ${lines} lines added`, function () {
          push(this.mermaid, lines);
          expect(this.mermaid.text.split("\n").length).to.equal(
            initialLines + lines
          );
        });
      });
    });
  });
}
