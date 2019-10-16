import {random} from './random';

it('Числа генерируются в диапазоне', () => {
    const min = 1;
    const max = 101;
    for (let i = 0; i < 1000; i++) {
        const number = random(min, max);
        expect(number).toBeGreaterThanOrEqual(min);
        expect(number).toBeLessThan(max);
    }
});