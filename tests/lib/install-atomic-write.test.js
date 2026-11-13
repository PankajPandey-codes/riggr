'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { writeUserConfigAtomically } = require('../../scripts/lib/install/apply');

let passed = 0;
let failed = 0;

function test(name, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'riggr-atomic-'));
  try {
    fn(dir);
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (error) {
    console.log(`  ✗ ${name}\n    ${error.message}`);
    failed++;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test('overwriting an existing config keeps the previous content as a .riggr.bak', dir => {
  const dest = path.join(dir, 'settings.json');
  fs.writeFileSync(dest, '{"mine":true}\n');
  writeUserConfigAtomically(dest, '{"merged":true}\n');
  assert.strictEqual(fs.readFileSync(dest, 'utf8'), '{"merged":true}\n');
  assert.strictEqual(fs.readFileSync(`${dest}.riggr.bak`, 'utf8'), '{"mine":true}\n');
});

test('a brand-new config is written without creating a backup', dir => {
  const dest = path.join(dir, '.mcp.json');
  writeUserConfigAtomically(dest, '{}\n');
  assert.strictEqual(fs.readFileSync(dest, 'utf8'), '{}\n');
  assert.ok(!fs.existsSync(`${dest}.riggr.bak`));
});

test('no temporary files are left next to the destination', dir => {
  const dest = path.join(dir, 'settings.json');
  fs.writeFileSync(dest, '{}\n');
  writeUserConfigAtomically(dest, '{"a":1}\n');
  assert.deepStrictEqual(fs.readdirSync(dir).sort(), ['settings.json', 'settings.json.riggr.bak']);
});

console.log(`\nPassed: ${passed}`);
console.log(`Failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);
