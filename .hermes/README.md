# RIGGR for Hermes

This directory contains the RIGGR configuration for the Hermes harness.

## What is installed

- `rules/riggr/` — shared coding rules and guidelines
- `skills/riggr/` — reusable skills
- `commands/` — slash commands
- `AGENTS.md` — agent instructions

## Manual install

```bash
bash ./install.sh --target hermes --profile minimal
```

## Notes

- Hermes config files (`config.yaml`, `.env`, etc.) are **not** touched by RIGGR install.
- Use `npx riggr-universal doctor --target hermes` to check install health.
