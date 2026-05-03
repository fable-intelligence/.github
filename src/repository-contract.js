const contractData = {
  "schemaVersion": "2026-05-03",
  "organization": "fable-intelligence",
  "repository": ".github",
  "packageName": "@fable-intelligence/org-governance",
  "area": "product",
  "phase": "formation",
  "mission": "Make the fable-intelligence organization feel like one disciplined company from the first commit.",
  "owns": [
    "Org profile and engineering handbook entry points",
    "Issue and decision templates",
    "Security disclosure defaults and contribution hygiene"
  ],
  "nonGoals": [
    "Product code",
    "Secrets or credentials",
    "Investor-only confidential material"
  ],
  "interfaces": [
    "All repositories consume these templates and standards."
  ],
  "first90Days": [
    "Publish engineering handbook v0",
    "Standardize labels, issue templates, and ADR format",
    "Define confidential-document handling rules"
  ],
  "productionGates": [
    {
      "id": "scope-boundary",
      "title": "Scope boundary is explicit",
      "risk": "ownership-drift",
      "evidenceRequired": "README, charter, and ADRs define what this repository owns and rejects."
    },
    {
      "id": "interface-contracts",
      "title": "Adjacent interfaces are documented",
      "risk": "integration-drift",
      "evidenceRequired": "Every upstream and downstream dependency has a versioned contract or decision record."
    },
    {
      "id": "privacy-security-review",
      "title": "Privacy and security review is complete",
      "risk": "user-trust",
      "evidenceRequired": "Sensitive data, permission boundaries, and failure modes are reviewed before demo or release use."
    },
    {
      "id": "test-evidence",
      "title": "Behavior has executable test evidence",
      "risk": "regression",
      "evidenceRequired": "Critical behavior is covered by automated tests or a documented hardware/operator validation procedure."
    },
    {
      "id": "launch-operations",
      "title": "Launch and operations path is understood",
      "risk": "readiness",
      "evidenceRequired": "Monitoring, support, rollback, ownership, and escalation are defined for production-impacting behavior."
    },
    {
      "id": "org-profile",
      "title": "Organization profile tells the company story",
      "risk": "alignment",
      "evidenceRequired": "The GitHub overview explains mission, repository ownership, operating cadence, and confidentiality."
    },
    {
      "id": "shared-templates",
      "title": "Shared templates are actionable",
      "risk": "execution-quality",
      "evidenceRequired": "Issues, decisions, reviews, and security defaults guide consistent work across repos."
    }
  ],
  "criticalWorkflows": [
    {
      "id": "governance-review",
      "title": "Review org standards",
      "metric": "All active repos pass shared hygiene checks."
    },
    {
      "id": "template-rollout",
      "title": "Roll out shared templates",
      "metric": "New work starts with the right issue, ADR, or review template."
    }
  ],
  "releaseRule": "No repository output may influence device, operator, silicon, security, or public product decisions until every production gate has passing evidence."
};

        function deepFreeze(value) {
          if (value && typeof value === "object" && !Object.isFrozen(value)) {
            for (const item of Object.values(value)) {
              deepFreeze(item);
            }
            Object.freeze(value);
          }
          return value;
        }

        function isNonEmptyString(value) {
          return typeof value === "string" && value.trim().length > 0;
        }

        function pushIf(errors, condition, message) {
          if (condition) {
            errors.push(message);
          }
        }

        export const repositoryContract = deepFreeze(contractData);

        export function validateRepositoryContract(contract = repositoryContract) {
          const errors = [];
          pushIf(errors, !isNonEmptyString(contract.schemaVersion), "schemaVersion is required");
          pushIf(errors, !isNonEmptyString(contract.organization), "organization is required");
          pushIf(errors, !isNonEmptyString(contract.repository), "repository is required");
          pushIf(errors, !isNonEmptyString(contract.mission), "mission is required");
          pushIf(errors, !Array.isArray(contract.owns) || contract.owns.length < 2, "owns must list at least two responsibilities");
          pushIf(errors, !Array.isArray(contract.nonGoals) || contract.nonGoals.length < 1, "nonGoals must list boundaries");
          pushIf(errors, !Array.isArray(contract.interfaces) || contract.interfaces.length < 1, "interfaces must list adjacent systems");
          pushIf(errors, !Array.isArray(contract.productionGates) || contract.productionGates.length < 5, "productionGates must define the quality bar");
          pushIf(errors, !Array.isArray(contract.criticalWorkflows) || contract.criticalWorkflows.length < 2, "criticalWorkflows must define proof paths");

          const gateIds = new Set();
          for (const gate of contract.productionGates ?? []) {
            pushIf(errors, !isNonEmptyString(gate.id), "gate id is required");
            pushIf(errors, !isNonEmptyString(gate.title), `gate ${gate.id ?? "unknown"} title is required`);
            pushIf(errors, !isNonEmptyString(gate.risk), `gate ${gate.id ?? "unknown"} risk is required`);
            pushIf(errors, !isNonEmptyString(gate.evidenceRequired), `gate ${gate.id ?? "unknown"} evidenceRequired is required`);
            pushIf(errors, gateIds.has(gate.id), `gate ${gate.id} is duplicated`);
            gateIds.add(gate.id);
          }

          const workflowIds = new Set();
          for (const workflow of contract.criticalWorkflows ?? []) {
            pushIf(errors, !isNonEmptyString(workflow.id), "workflow id is required");
            pushIf(errors, !isNonEmptyString(workflow.title), `workflow ${workflow.id ?? "unknown"} title is required`);
            pushIf(errors, !isNonEmptyString(workflow.metric), `workflow ${workflow.id ?? "unknown"} metric is required`);
            pushIf(errors, workflowIds.has(workflow.id), `workflow ${workflow.id} is duplicated`);
            workflowIds.add(workflow.id);
          }

          return {
            valid: errors.length === 0,
            errors
          };
        }

        export function requiredEvidenceTemplate(contract = repositoryContract) {
          return Object.fromEntries(
            contract.productionGates.map((gate) => [
              gate.id,
              {
                status: "pending",
                evidence: "",
                owner: "",
                reviewedAt: ""
              }
            ])
          );
        }

        export function evaluateProductionReadiness(evidence = {}, contract = repositoryContract) {
          const validation = validateRepositoryContract(contract);
          const gateResults = contract.productionGates.map((gate) => {
            const supplied = evidence[gate.id] ?? {};
            const hasPassingStatus = supplied.status === "pass";
            const hasEvidence = isNonEmptyString(supplied.evidence);
            const passed = hasPassingStatus && hasEvidence;
            return {
              id: gate.id,
              title: gate.title,
              risk: gate.risk,
              passed,
              evidence: supplied.evidence ?? "",
              owner: supplied.owner ?? "",
              reviewedAt: supplied.reviewedAt ?? "",
              blocker: passed ? null : `${gate.id} requires passing status and evidence`
            };
          });

          const blockers = [
            ...validation.errors,
            ...gateResults.filter((gate) => !gate.passed).map((gate) => gate.blocker)
          ];
          const passedCount = gateResults.filter((gate) => gate.passed).length;
          const score = gateResults.length === 0 ? 0 : Math.round((passedCount / gateResults.length) * 100);

          return {
            repository: contract.repository,
            ready: blockers.length === 0,
            score,
            blockers,
            gateResults
          };
        }

        export function assertProductionReady(evidence = {}, contract = repositoryContract) {
          const result = evaluateProductionReadiness(evidence, contract);
          if (!result.ready) {
            throw new Error(`${contract.repository} is not production-ready: ${result.blockers.join("; ")}`);
          }
          return result;
        }
