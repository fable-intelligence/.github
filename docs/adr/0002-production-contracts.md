# ADR 0002: Executable Production Contract

## Status

Accepted

## Context

Fable's repositories must not drift into documents, placeholders, or unreviewed implementation. Each repo needs an executable definition of what it owns, which interfaces it affects, and what proof is required before its work can influence product, device, operator, silicon, or security decisions.

## Decision

Each repository maintains a production contract in `src/repository-contract.js`, tests it with `node --test`, and documents the same gates in `docs/production-readiness.md`.

## Consequences

- Readiness becomes testable instead of subjective.
- Product, engineering, hardware, security, and operator decisions share one evidence language.
- A repo can move quickly while still blocking production-impacting claims until proof exists.
