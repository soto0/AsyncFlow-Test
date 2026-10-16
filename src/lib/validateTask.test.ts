import { validateTask } from './validateTask';

describe('validateTask', () => {
    it('accepts valid input', () => {
        expect(validateTask({ title: 'Valid task', priority: 'low' })).toEqual({});
    });

    it('requires a non-blank title', () => {
        expect(validateTask({ title: '   ', priority: 'low' }).title).toBeDefined();
    });

    it('rejects too short titles', () => {
        expect(validateTask({ title: 'ab', priority: 'low' }).title).toMatch(/Минимум/);
    });

    it('rejects too long descriptions', () => {
        expect(validateTask({ title: 'Valid', description: 'x'.repeat(501), priority: 'low' }).description).toBeDefined();
    });
});
