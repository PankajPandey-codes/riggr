'use strict';

const assert = require('assert');
const {
  normalizeGitHubGitOrigin,
} = require('../../scripts/lib/github-origin');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

console.log('\nGitHub origin normalization');

if (test('accepts only authenticated or TLS GitHub origins', () => {
  assert.strictEqual(
    normalizeGitHubGitOrigin('https://github.com/pankajpandey-codes/riggr.git'),
    'pankajpandey-codes/riggr'
  );
  assert.strictEqual(
    normalizeGitHubGitOrigin('ssh://git@github.com/pankajpandey-codes/riggr/'),
    'pankajpandey-codes/riggr'
  );
  assert.strictEqual(
    normalizeGitHubGitOrigin('git@github.com:pankajpandey-codes/riggr.git'),
    'pankajpandey-codes/riggr'
  );
})) passed++; else failed++;

if (test('rejects shorthand and insecure or unrelated origins', () => {
  assert.strictEqual(normalizeGitHubGitOrigin('pankajpandey-codes/riggr'), null);
  assert.strictEqual(
    normalizeGitHubGitOrigin('http://github.com/pankajpandey-codes/riggr.git'),
    null
  );
  assert.strictEqual(
    normalizeGitHubGitOrigin('https://example.com/pankajpandey-codes/riggr.git'),
    null
  );
  assert.strictEqual(normalizeGitHubGitOrigin(null), null);
})) passed++; else failed++;

console.log(`\nPassed: ${passed}`);
console.log(`Failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);
