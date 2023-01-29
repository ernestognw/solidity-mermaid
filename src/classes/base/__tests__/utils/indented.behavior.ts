import Indented from "@classes/base/indented";
import { expect } from "chai";

export interface BehaveLikeIntendedParams {
  initialIndentation: number;
  build: (indentation: number) => Indented;
}

export function shouldBehaveLikeIndented({
  initialIndentation = 0,
  build,
}: BehaveLikeIntendedParams) {
  describe(`extends ${Indented.name}`, () => {
    beforeEach(function () {
      this.indented = build(0);
    });

    function call(
      indented: Indented,
      method: "indent" | "unindent",
      times: number
    ) {
      for (let i = 0; i < times; i++) indented[method]();
    }

    const indentations = new Array(5).fill("").map((_, index) => 2 ** index);

    describe("#constructor", function () {
      indentations.forEach((indentation) => {
        it(`sets ${indentation} initial indentation`, function () {
          const customIndented = build(indentation);
          expect(customIndented["indentation"]).to.equal(
            initialIndentation + indentation
          );
        });
      });
    });

    describe("+indent", function () {
      [0, ...indentations].forEach((indentation) => {
        it(`should add ${indentation} spaces of indentation`, function () {
          call(this.indented, "indent", indentation);
          expect(this.indented["indentation"]).to.equal(
            initialIndentation + indentation
          );
        });
      });
    });

    describe("+unindent", function () {
      const initialValue = 100; // Should be higher than indentations map

      [0, ...indentations].reverse().forEach((indentation) => {
        it(`should unindent ${indentation} spaces from initial (${initialValue})`, function () {
          const customIndented = build(initialValue);
          call(customIndented, "unindent", indentation);
          expect(customIndented["indentation"]).to.equal(
            initialValue - indentation + initialIndentation
          );
        });
      });

      it("should avoid unindent from 0", function () {
        this.indented["_indentation"] = 0;
        this.indented.unindent();
        expect(this.indented["_indentation"]).to.equal(0);
      });
    });
  });
}
