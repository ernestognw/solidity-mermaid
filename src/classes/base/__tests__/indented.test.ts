import { expect } from "chai";
import Indented from "../indented";

describe("Indented", () => {
  let indented: Indented;

  beforeEach(() => {
    indented = new Indented();
  });

  function call(
    indented: Indented,
    method: "indent" | "unindent",
    times: number
  ) {
    for (let i = 0; i < times; i++) indented[method]();
  }

  const indentations = new Array(5).fill("").map((_, index) => 2 ** index);

  describe("constructor", () => {
    indentations.forEach((indentation) => {
      it(`sets ${indentation} initial indentation`, () => {
        const customIndented = new Indented(indentation);
        expect(customIndented["indentation"]).to.equal(indentation);
      });
    });
  });

  describe("indent", () => {
    [0, ...indentations].forEach((indentation) => {
      it(`should add ${indentation} spaces of indentation`, () => {
        call(indented, "indent", indentation);
        expect(indented["indentation"]).to.equal(indentation);
      });
    });
  });

  describe("unindent", () => {
    const initialValue = 100; // Should be higher than indentations map

    [0, ...indentations].reverse().forEach((indentation) => {
      it(`should unindent ${indentation} spaces from initial (${initialValue})`, () => {
        const customIndented = new Indented(initialValue);
        call(customIndented, "unindent", indentation);
        expect(customIndented["indentation"]).to.equal(
          initialValue - indentation
        );
      });
    });

    it("should avoid unindent from 0", () => {
      expect(indented.unindent.bind(indented)).to.throw(
        "Indentation can be < 0"
      );
    });
  });
});
