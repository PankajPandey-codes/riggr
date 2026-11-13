'use strict';

// The riggr@riggr plugin exposes agents, commands and skills under an `riggr:`
// namespace (`riggr:planner`, `/riggr:plan`). A manual install
// (install-apply --target claude|claude-project) places the same files at bare
// names, so plugin-prefixed references in copied markdown must drop the prefix
// or they point at agents and commands that do not exist in that layout.
//
// The leading guard keeps `riggr@riggr` and words that merely end in "riggr" (e.g.
// "decc:") untouched; the lookahead requires a real identifier after the colon.
const PLUGIN_NAMESPACE_PREFIX = /(^|[^A-Za-z0-9_@.-])riggr:(?=[a-z][a-z0-9-]*)/gm;

function stripPluginNamespace(content) {
  return String(content).replace(PLUGIN_NAMESPACE_PREFIX, '$1');
}

module.exports = {
  stripPluginNamespace,
};
