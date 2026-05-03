import assert from "node:assert/strict";
import test from "node:test";
import {
  assertProductionReady,
  evaluateProductionReadiness,
  repositoryContract,
  requiredEvidenceTemplate,
  validateRepositoryContract
} from "../src/repository-contract.js";

test("repository contract is complete and internally consistent", () => {
  const result = validateRepositoryContract();
  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
  assert.ok(Object.isFrozen(repositoryContract));
});

test("evidence template covers every production gate", () => {
  const template = requiredEvidenceTemplate();
  assert.deepEqual(
    Object.keys(template).sort(),
    repositoryContract.productionGates.map((gate) => gate.id).sort()
  );
});

test("readiness blocks missing evidence", () => {
  const result = evaluateProductionReadiness();
  assert.equal(result.ready, false);
  assert.equal(result.score, 0);
  assert.equal(result.blockers.length, repositoryContract.productionGates.length);
});

test("readiness passes only when every gate has proof", () => {
  const evidence = Object.fromEntries(
    repositoryContract.productionGates.map((gate) => [
      gate.id,
      {
        status: "pass",
        evidence: `docs/proof/${gate.id}.md`,
        owner: "founder",
        reviewedAt: "2026-05-03"
      }
    ])
  );
  const result = assertProductionReady(evidence);
  assert.equal(result.ready, true);
  assert.equal(result.score, 100);
});

test("critical workflows define measurable proof paths", () => {
  assert.ok(repositoryContract.criticalWorkflows.length >= 2);
  for (const workflow of repositoryContract.criticalWorkflows) {
    assert.match(workflow.id, /^[a-z0-9-]+$/);
    assert.ok(workflow.metric.length > 20);
  }
});
