import { spawnSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const tests = (await readdir(path.join(root, 'tests')))
  .filter((file) => file.endsWith('.test.mjs'))
  .sort()
  .map((file) => path.join(root, 'tests', file));
const result = spawnSync(
  process.execPath,
  ['--experimental-strip-types', '--test', ...tests],
  {
    cwd: root,
    env: { ...process.env, BLOGGPT_TEST_SAMPLE_CONTENT: '1' },
    stdio: 'inherit',
  },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
