import { calculateReadTime } from '../src/utils/readTime.js';

let failures = 0;

function test(description: string, fn: () => void): void {
    try {
        fn();
        console.log(`✅ ${description}`);
    } catch (err) {
        console.error(`❌ ${description}: ${(err as Error).message}`);
        failures++;
    }
}

function expect(actual: unknown) {
    return {
        toBe(expected: unknown) {
            if (actual !== expected) {
                throw new Error(`Expected ${String(expected)}, got ${String(actual)}`);
            }
        },
    };
}

test('returns 0 for an empty string', () => {
    expect(calculateReadTime('')).toBe(0);
});

test('returns 1 for a 200-word text', () => {
    expect(calculateReadTime('word '.repeat(200).trim())).toBe(1);
});

test('rounds up for partial minutes', () => {
    expect(calculateReadTime('word '.repeat(201).trim())).toBe(2);
});

process.exit(failures > 0 ? 1 : 0);

