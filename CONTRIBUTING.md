# Contributing

Fable repositories are private-by-default and trust-critical. Every change should make the system easier to reason about, safer to operate, or more useful to a real user.

## Operating Rules

- Keep repository ownership boundaries clear.
- Do not commit secrets, credentials, personal user data, carrier credentials, operator lab material, private keys, or supplier-confidential material.
- Use synthetic fixtures for tests.
- Add or update an ADR for irreversible product, architecture, hardware, operator, privacy, or security decisions.
- Keep user approval, auditability, recovery, and privacy visible for consequential actions.
- Label mocked, simulated, partner-gated, or lab-only behavior clearly.

## Change Requirements

Before a change is ready to merge:

- `npm test` passes.
- The relevant Rust, Go, Swift, or JavaScript checks pass through `npm test`.
- The PR explains the user, device, operator, security, or product impact.
- Production-impacting changes include release evidence or a clear reason they are not release-impacting.
- New external action paths include approval, ledger, and recovery behavior.

## Review Posture

Reviewers should prioritize:

- user trust regressions;
- privacy and retention risk;
- missing approval or ledger behavior;
- untestable launch claims;
- unclear ownership boundaries;
- operator, emergency, support, or recovery gaps;
- hardware impact without product, security, operator, support, and cost evidence.
