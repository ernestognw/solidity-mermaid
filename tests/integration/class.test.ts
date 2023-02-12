import solc from "solc";
import glob from "glob";
import { join, relative } from "path";
import { readFileSync } from "fs";
import { SolcOutput } from "solidity-ast/solc";
import { findAll } from "solidity-ast/utils";
import Class from "@classes/diagrams/class";
import axios from "axios";
import { Parser } from "jison";
import { expect } from "chai";

function getContracts() {
  const modulesPath = join(__dirname, "..", "..", "node_modules");
  const ozPath = join(modulesPath, "@openzeppelin/contracts");
  const contracts = glob.sync(join(ozPath, "/**/*.sol")).map((contract) => ({
    name: contract.split("/").reverse()[0],
    content: readFileSync(relative(".", contract), "utf-8"),
  }));

  return contracts;
}

function getOutput(name: string, source: { content: string }): SolcOutput {
  const input = {
    language: "Solidity",
    sources: { [name]: source },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
          "": ["ast"],
        },
      },
    },
  };

  return JSON.parse(solc.compile(JSON.stringify(input)));
}

const getParserFrom = (grammar) => {
  const YY_REGEX = /yy\.(\w*).?(?=\()/g;
  const yyMock = {};
  for (const yyFunction of grammar.match(YY_REGEX)) {
    yyMock[yyFunction.replace("yy.", "")] = () => void 0;
  }
  const parser = new Parser(grammar);
  parser.yy = yyMock;
  return parser;
};

describe("Class Diagram", function () {
  // Yes, I know this is horrible but the mermaid team doesn't publish the grammar within their npm package
  const MERMAID_9_3_0_GRAMMAR =
    "https://raw.githubusercontent.com/mermaid-js/mermaid/v9.3.0/packages/mermaid/src/diagrams/class/parser/classDiagram.jison";

  describe("all @openzeppelin/contracts are valid", function () {
    let parser;

    before("load parser", async function () {
      const { data } = await axios.get(MERMAID_9_3_0_GRAMMAR);
      parser = getParserFrom(data);
    });

    for (const { name, content } of getContracts()) {
      const output = getOutput(name, { content });

      for (const [, { ast, id }] of Object.entries(output.sources)) {
        for (const typeDef of findAll(["ContractDefinition"], ast)) {
          it(`creates Class Diagram for ${name}`, async function () {
            const classDiagram = new Class(
              {
                sources: {
                  contract: {
                    ast,
                    id,
                  },
                },
              },
              "ContractDefinition",
              typeDef.id
            );
            parser.parse(classDiagram.processed);

            expect(true).to.be.true; // It just needs to not throw
          });
        }
      }
    }
  });
});
