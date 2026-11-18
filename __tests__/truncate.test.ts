import { test, expect } from '@jest/globals';
import { truncate } from '../src/utils/truncate';

test('returns the text unchanged when it fits within the limit', () => {
    expect(truncate('Short text', 20)).toBe('Short text');
});

test('truncates long text and appends ellipsis', () => {
    expect(truncate('A very long post summary', 10)).toBe('A very lon...');
});

test('returns an empty string for empty input', () => {
    expect(truncate('', 10)).toBe('');
});

test('returns the text unchanged when its length equals maxLength', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
});

test('string truncates when text length exceeds maxLength by one', () => {
    expect(truncate('Hello!', 5)).toBe('Hello...');
});

