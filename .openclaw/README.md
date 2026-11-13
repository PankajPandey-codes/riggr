# RIGGR for OpenClaw

This directory contains the RIGGR configuration for the OpenClaw harness.

## What is installed

- `rules/riggr/` — shared coding rules and guidelines
- `skills/riggr/` — reusable skills
- `commands/` — slash commands
- `AGENTS.md` — agent instructions

## Manual install

```bash
bash ./install.sh --target openclaw --profile minimal
```

## Notes

- OpenClaw config files (`openclaw.json`, `config.toml`, `.env`, etc.) are **not** touched by RIGGR install.
- Use `npx riggr-universal doctor --target openclaw` to check install health.
