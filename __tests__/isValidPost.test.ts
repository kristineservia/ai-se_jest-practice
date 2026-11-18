import { isValidPost } from '../src/utils/validate.js';
import { test, expect } from '@jest/globals';

test('returns true when both title and content are non-empty strings', () => {
    expect(isValidPost({title: 'My First Post', content: 'Learning Jest testing'})).toBe(true);
});

test('returns false when the title is an empty string', () => {
    expect(isValidPost({title: '', content: 'Learning Jest testing'})).toBe(false);
});

test('returns false when the content is an empty string', () => {
    expect(isValidPost({title: 'My First Post', content: ''})).toBe(false);
});