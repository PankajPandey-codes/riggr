'use strict';

const assert = require('assert');
const path = require('path');
const { spawnSync } = require('child_process');
const { version } = require('../../package.json');

const repoRoot = path.resolve(__dirname, '..', '..');
const riggrScript = path.join(repoRoot, 'scripts', 'riggr.js');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed += 1;
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
    failed += 1;
  }
}

function runEcc(args, env = {}) {
  return spawnSync(process.execPath, [riggrScript, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: { ...process.env, NO_COLOR: '1', ...env },
  });
}

function containsTerminalControlBytes(value) {
  return Array.from(value).some(character => {
    const codePoint = character.codePointAt(0);
    return codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f);
  });
}

console.log('\n=== RIGGR welcome command tests ===\n');

test('riggr welcome renders the install artwork for captured agent output', () => {
  const result = runEcc(['welcome']);

  assert.strictEqual(result.status, 0, result.stderr);
  assert.match(result.stdout, /Welcome to RIGGR!/);
  assert.ok(result.stdout.includes(`v${version}`));
  assert.match(result.stdout, /GitHub:\s+https:\/\/github\.com\/pankajpandey-codes\/riggr/);
  assert.match(result.stdout, /Discord:\s+https:\/\/discord\.gg\/36yGMHGFbR/);
  assert.strictEqual(result.stderr, '');
});

test('riggr welcome disables ANSI color when stdout is redirected', () => {
  const env = { ...process.env, TERM: 'xterm-256color' };
  delete env.NO_COLOR;
  const result = spawnSync(process.execPath, [riggrScript, 'welcome'], {
    cwd: repoRoot,
    encoding: 'utf8',
    env,
  });

  assert.strictEqual(result.status, 0, result.stderr);
  assert.strictEqual(result.stdout.includes('\u001b['), false);
});

test('riggr welcome supports explicit update and configured outcomes', () => {
  const cases = [
    ['updated', /RIGGR is updated/],
    ['configured', /RIGGR is configured/],
    ['migrated', /RIGGR is configured/],
    ['resumed', /RIGGR is configured/],
    ['already-migrated', /RIGGR is configured/],
  ];

  for (const [action, expected] of cases) {
    const result = runEcc(['welcome', '--action', action]);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.stdout, expected);
  }
});

test('riggr welcome renders a provider-verified installed version', () => {
  const result = runEcc(['welcome', '--version', '2.1.0']);

  assert.strictEqual(result.status, 0, result.stderr);
  assert.match(result.stdout, /v2\.1\.0/);
});

test('riggr welcome rejects unsafe version text', () => {
  const result = runEcc(['welcome', '--version', '2.1.0\u001b[31m']);

  assert.strictEqual(result.status, 1);
  assert.match(result.stderr, /Invalid --version value/);
  assert.strictEqual(containsTerminalControlBytes(result.stderr.trimEnd()), false);
  assert.strictEqual(result.stdout, '');
});

test('riggr welcome keeps parser error output free of terminal control bytes', () => {
  const actionResult = runEcc(['welcome', '--action', 'broken\u001b[31m']);
  const argumentResult = runEcc(['welcome', '--bad\u001b[31m']);

  for (const result of [actionResult, argumentResult]) {
    assert.strictEqual(result.status, 1);
    assert.strictEqual(containsTerminalControlBytes(result.stderr.trimEnd()), false);
    assert.strictEqual(result.stdout, '');
  }
});

test('riggr welcome rejects unknown actions before rendering', () => {
  const result = runEcc(['welcome', '--action', 'broken']);

  assert.strictEqual(result.status, 1);
  assert.match(result.stderr, /Invalid --action value/);
  assert.strictEqual(result.stdout, '');
});

console.log(`\nResults: Passed: ${passed}, Failed: ${failed}\n`);
if (failed > 0) process.exit(1);
