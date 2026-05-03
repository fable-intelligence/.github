# Production Readiness Contract

        ## Mission

        Make the fable-intelligence organization feel like one disciplined company from the first commit.

        ## Release Rule

        No repository output may influence device, operator, silicon, security, or public product decisions until every production gate has passing evidence.

        ## Production Gates

        | Gate | Title | Risk | Evidence Required |
        | --- | --- | --- | --- |
        | `scope-boundary` | Scope boundary is explicit | ownership-drift | README, charter, and ADRs define what this repository owns and rejects. |
| `interface-contracts` | Adjacent interfaces are documented | integration-drift | Every upstream and downstream dependency has a versioned contract or decision record. |
| `privacy-security-review` | Privacy and security review is complete | user-trust | Sensitive data, permission boundaries, and failure modes are reviewed before demo or release use. |
| `test-evidence` | Behavior has executable test evidence | regression | Critical behavior is covered by automated tests or a documented hardware/operator validation procedure. |
| `launch-operations` | Launch and operations path is understood | readiness | Monitoring, support, rollback, ownership, and escalation are defined for production-impacting behavior. |
| `org-profile` | Organization profile tells the company story | alignment | The GitHub overview explains mission, repository ownership, operating cadence, and confidentiality. |
| `shared-templates` | Shared templates are actionable | execution-quality | Issues, decisions, reviews, and security defaults guide consistent work across repos. |

        ## Critical Workflows

        | Workflow | Title | Metric |
        | --- | --- | --- |
        | `governance-review` | Review org standards | All active repos pass shared hygiene checks. |
| `template-rollout` | Roll out shared templates | New work starts with the right issue, ADR, or review template. |

        ## Evidence Format

        Evidence is supplied to `evaluateProductionReadiness` as a map keyed by gate id.

        ```js
        {
          "scope-boundary": {
            status: "pass",
            evidence: "docs/proof/scope-boundary.md",
            owner: "founder",
            reviewedAt: "2026-05-03"
          }
        }
        ```

        A repository is ready only when every gate has `status: "pass"` and a non-empty evidence path.
