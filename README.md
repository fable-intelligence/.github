# .github
![ci](https://github.com/fable-intelligence/.github/actions/workflows/ci.yml/badge.svg)

![Fable](https://img.shields.io/badge/Fable-Confidential-111827) ![status](https://img.shields.io/badge/status-formation-1F6F5B) ![phase](https://img.shields.io/badge/phase-formation-2E7D68) ![area](https://img.shields.io/badge/area-product-345995) ![docs](https://img.shields.io/badge/docs-ADR--ready-6B7280) ![license](https://img.shields.io/badge/license-private-B91C1C)

> **Confidential Fable Intelligence repository.** Do not publish, mirror, export, or share outside approved Fable channels.

## System Position

Organization governance layer: standards, templates, and rituals used across every private Fable repository.

## Tags

`fable` `confidential` `product` `formation` `governance` `templates` `standards`

## Mission

Make the fable-intelligence organization feel like one disciplined company from the first commit.

<!-- FABLE:PRODUCTION-CONTRACT:START -->
## Executable Production Contract

This repository includes a tested production contract that defines ownership, launch gates, critical workflows, and evidence required before the work can influence device, operator, silicon, security, or public product decisions.

```bash
npm test
npm run test:contract
```

- Contract: [`src/repository-contract.js`](src/repository-contract.js)
- Readiness gates: [`docs/production-readiness.md`](docs/production-readiness.md)
- ADR: [`docs/adr/0002-production-contracts.md`](docs/adr/0002-production-contracts.md)
- Production gate count: `7`
<!-- FABLE:PRODUCTION-CONTRACT:END -->

## Repository Snapshot

| Field | Value |
| --- | --- |
| Organization | `fable-intelligence` |
| Repository | `.github` |
| Area | `product` |
| Phase | `formation` |
| Default Branch | `main` |
| Visibility | Private |
| Decision Log | `docs/adr/` |
| Roadmap | `ROADMAP.md` |

## Owns

- Org profile and engineering handbook entry points
- Issue and decision templates
- Security disclosure defaults and contribution hygiene

## Does Not Own

- Product code
- Secrets or credentials
- Investor-only confidential material

## Interfaces

- All repositories consume these templates and standards.

## First 90 Days

- Publish engineering handbook v0
- Standardize labels, issue templates, and ADR format
- Define confidential-document handling rules

## Quality Gates

- No secrets, credentials, personal user data, carrier credentials, or platform tokens in Git.
- Every irreversible decision gets an ADR in `docs/adr/`.
- Every launch-critical claim must have a measurable proof path.
- Design and product claims must map to a test, prototype, or user study.
- User trust beats demo impressiveness whenever they conflict.

## Operating Cadence

| Rhythm | Ritual |
| --- | --- |
| Daily | Keep work tied to an issue and update blockers early. |
| Weekly | Publish a short progress note: shipped, learned, blocked, next. |
| Decision Needed | Open or update an ADR before implementation hardens. |
| Before Demo | State whether integrations are live, mocked, simulated, or partner-gated. |
| Before Hardware Impact | Require product, security, operator, support, and cost review. |

## Working Rules

- Keep user trust, privacy, and auditability ahead of demo speed.
- Write down irreversible decisions in `docs/adr/`.
- Never commit credentials, social account tokens, operator credentials, personal user data, supplier quotes under NDA, or private keys.
- Prefer prototypes that can be evaluated with real workflow success metrics.

## Useful Entry Points

- [`ROADMAP.md`](ROADMAP.md) - first 90 days and phase progression.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) - default contribution and review rules.
- [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) - default pull request evidence template.
- [`.github/ISSUE_TEMPLATE/release-readiness.yml`](.github/ISSUE_TEMPLATE/release-readiness.yml) - release readiness issue template.
- [`docs/release-evidence-template.md`](docs/release-evidence-template.md) - release decision evidence template.
- [`docs/review-checklist.md`](docs/review-checklist.md) - review checklist for trust-critical changes.
- [`docs/charter.md`](docs/charter.md) - repository ownership and boundaries.
- [`docs/adr/0001-repository-charter.md`](docs/adr/0001-repository-charter.md) - initial decision record.
- [`CONFIDENTIALITY.md`](CONFIDENTIALITY.md) - what must never be committed here.
