import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { check, printResults, PROJECT_ROOT } from './utils.js';

async function main() {
  console.log('Lesson 05 — Testing Edge Cases\n');

  const results = [];

  const testFilePath = path.join(PROJECT_ROOT, '__tests__/isValidPost.test.ts');
  const testFileSrc = fs.existsSync(testFilePath)
    ? fs.readFileSync(testFilePath, 'utf8')
    : '';

  results.push(
    check(
      '__tests__/isValidPost.test.ts exists',
      fs.existsSync(testFilePath),
      'Create __tests__/isValidPost.test.ts (complete lesson 04 first).',
    ),
  );

  const testCount = (testFileSrc.match(/\btest\s*\(/g) || []).length;
  results.push(
    check(
      'test file has at least 5 tests',
      testCount >= 5,
      'Add at least two edge case tests (whitespace-only title and content) to your isValidPost.test.ts.',
    ),
  );

  const falseCount = (testFileSrc.match(/\.toBe\(false\)/g) || []).length;
  results.push(
    check(
      'has at least 4 .toBe(false) assertions',
      falseCount >= 4,
      'Add edge case tests for whitespace-only title and whitespace-only content — both should return false.',
    ),
  );

  let testError = false;
  if (fs.existsSync(testFilePath)) {
    // Windows compatibility fix:
    // Original error: "spawnSync npm ENOENT"
    // The original spawnSync('npm', ...) call failed on Windows,
    // even though all ten Jest unit tests passed successfully.
    // Modified the script to use cmd.exe when running on Windows,
    // while preserving the original npm command for other systems.
    //
    // Source used for debugging and implementing the fix: ChatGPT (OpenAI).
    const isWindows = process.platform === 'win32';

    const result = spawnSync(
      isWindows ? 'cmd.exe' : 'npm',
      isWindows
        ? [
            '/d',
            '/s',
            '/c',
            'npm',
            'test',
            '--',
            '--testPathPatterns=isValidPost',
            '--passWithNoTests',
          ]
        : ['test', '--', '--testPathPatterns=isValidPost', '--passWithNoTests'],
      { cwd: PROJECT_ROOT, encoding: 'utf8' },
    );

    testError = result.status !== 0;
  }

  results.push(
    check(
      'all tests pass',
      !testError,
      'Run npm test and fix any failing tests.',
    ),
  );

  printResults(results, 'RQTRF');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Test runner error: ${err.message}`);
  console.log('');
  process.exit(1);
});
