const hre = require("hardhat");
const { assert } = require("chai");

describe("boolean array summation example circuit", () => {
  let circuit;

  const sampleInput = {
    b: [0, 0, 0, 1],
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("boolean_array_summation_example");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    
    console.log(witness);

    for (let i = 0; i < sampleInput.b.length; i++) {
      const expectedValue = sampleInput.b[i].toString();
      const actualValue = witness[`main.b[${i}]`];

      // Assert that the value is either the expected sample input or undefined
      assert.isTrue(
        actualValue === expectedValue || actualValue === undefined,
        `Expected main.b[${i}] to be ${expectedValue} or undefined, but got ${actualValue}`
      );
    }

    assert.propertyVal(witness, "main.S", undefined);
    assert.propertyVal(witness, "main.index", "3");
  });

  it("has the correct output", async () => {
    const expected = { index: 3 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});
