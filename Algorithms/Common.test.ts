import { randomInt, randomFloat } from "./Common";
import * as fc from 'fast-check';

describe('randomInt()', () => {
    it('must return a integer value between minimum and maximum value (inclusively)', () => {
        fc.assert(fc.property(fc.maxSafeInteger(), fc.maxSafeInteger(), (a, b) => {
            let min = Math.min(a, b);
            let max = Math.max(a,b);
            let rand = randomInt(min, max);
            expect(rand).toBeGreaterThanOrEqual(min);
            expect(rand).toBeLessThanOrEqual(max);
            expect(Number.isInteger(rand)).toBe(true);
        }));
    });
});

describe('randomFloat()', () => {
    it('must return a float value between minimum and maximum value (inclusively)', () => {
        fc.assert(fc.property(fc.float({noDefaultInfinity: true, noNaN: true}), fc.float({noDefaultInfinity: true, noNaN: true}), (a, b) => {
            let min = Math.min(a, b);
            let max = Math.max(a,b);
            let rand = randomFloat(min, max);
            expect(rand).toBeGreaterThanOrEqual(min);
            expect(rand).toBeLessThanOrEqual(max);
        }));
    });
});