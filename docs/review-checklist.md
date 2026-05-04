# Review Checklist

Use this checklist for meaningful changes across Fable repositories.

## Product Trust

- The change is understandable from the user's point of view.
- Consequential actions ask before acting.
- Ledger or audit behavior is visible where needed.
- Recovery behavior returns control to the user.

## Privacy And Security

- No secrets or personal user data are committed.
- Sensitive data has retention, deletion, and consent handling.
- Credential handling stays inside vault or approved platform boundaries.
- Threat-model impact is captured when data flow changes.

## Operator And Hardware

- Calls, messages, emergency behavior, eSIM, IMS, roaming, and support impact are called out when relevant.
- Hardware impact has product, security, operator, support, cost, battery, thermal, and manufacturability context.
- Mocked, simulated, partner-gated, and live integrations are labeled clearly.

## Evidence

- `npm test` passes.
- Any native core tests pass through `npm test`.
- Launch-critical claims link to tests, scorecards, prototypes, ADRs, or partner/operator evidence.
