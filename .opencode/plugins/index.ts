/**
 * RIGGR Plugins for OpenCode
 *
 * This module exports all RIGGR plugins for OpenCode integration.
 * Plugins provide hook-based automation that mirrors Claude Code's hook system
 * while taking advantage of OpenCode's more sophisticated 20+ event types.
 */

export { RIGGRHooksPlugin, default } from "./riggr-hooks.ts"

// Re-export for named imports
export * from "./riggr-hooks.ts"
