import { test, expect } from '@jest/globals';
import { isValidPost } from '../src/utils/validate.js';

test('returns true when both title and content are non-empty strings', () => {
    expect(isValidPost({title: 'My First Post', content: 'Learning Jest testing'})).toBe(true);
});

test('returns false when the title is an empty string', () => {
    expect(isValidPost({title: '', content: 'Learning Jest testing'})).toBe(false);
});

test('returns false when the content is an empty string', () => {
    expect(isValidPost({title: 'My First Post', content: ''})).toBe(false);
});

test('returns false when the title contains only whitespace', () => {
    expect(isValidPost({
        title: '   ',
        content: 'Learning Jest testing',
    })).toBe(false);
});

test('returns false when the content contains only whitespace', () => {
    expect(isValidPost({
        title: 'My First Post',
        content: '   ',
    })).toBe(false);
});