import { Random, Seeded } from "./Random";
import * as fc from 'fast-check';

describe('Random.nextInteger()', () => {
    it('must return a integer value between minimum and maximum value (inclusively)', () => {
        fc.assert(fc.property(fc.maxSafeInteger(), fc.maxSafeInteger(), (a, b) => {
            let min = Math.min(a, b);
            let max = Math.max(a,b);
            let rand = Random.nextInteger(min, max);
            expect(rand).toBeGreaterThanOrEqual(min);
            expect(rand).toBeLessThanOrEqual(max);
            expect(Number.isInteger(rand)).toBe(true);
        }));
    });
});

describe('Random.nextFloat()', () => {
    it('must return a float value between minimum and maximum value (inclusively)', () => {
        fc.assert(fc.property(fc.float({noDefaultInfinity: true, noNaN: true}), fc.float({noDefaultInfinity: true, noNaN: true}), (a, b) => {
            let min = Math.min(a, b);
            let max = Math.max(a,b);
            let rand = Random.nextFloat(min, max);

            expect(rand).toBeGreaterThanOrEqual(min);
            expect(rand).toBeLessThanOrEqual(max);
        }));
    });
});

describe('Seeded.nextValue()', () => {
    it('must return the same values by both Random seeded with the same seed', () => {
        fc.assert(fc.property(fc.array(fc.maxSafeInteger()), seeds => {
            for (const seed of seeds) {
                Seeded.setSeed(seed);
                let val1 = Seeded.nextValue();
                Seeded.setSeed(seed);
                let val2 = Seeded.nextValue();
                expect(val1).toBe(val2);
            }
        }));
    });
});

describe('Seeded.nextInteger()', () => {
    it('must return the same values by both Random seeded with the same seed', () => {
        fc.assert(fc.property(fc.array(fc.maxSafeInteger()), seeds => {
            for (const seed of seeds) {
                Seeded.setSeed(seed);
                let val1 = Seeded.nextInteger(0, 1000);
                Seeded.setSeed(seed);
                let val2 = Seeded.nextInteger(0, 1000);
                expect(val1).toBe(val2);
            }
        }));
    });
});

describe('Seeded.nextFloat()', () => {
    it('must return the same values by both Random seeded with the same seed', () => {
        fc.assert(fc.property(fc.array(fc.maxSafeInteger()), seeds => {
            for (const seed of seeds) {
                Seeded.setSeed(seed);
                let val1 = Seeded.nextFloat(0, 1000.0);
                Seeded.setSeed(seed);
                let val2 = Seeded.nextFloat(0, 1000.0);
                expect(val1).toBe(val2);
            }
        }));
    });
});

describe('Seeded.Random.nextValue()', () => {
    it('must return the same values by both Random seeded with the same seed', () => {
        fc.assert(fc.property(fc.maxSafeInteger(), seed => {
            let rand1 = new Seeded.Random(seed);
            let rand2 = new Seeded.Random(seed);
            for (let i = 0; i < 100; i++) {
                expect(rand1.nextValue()).toBe(rand2.nextValue());
            }            
        }));
    });
});

describe('Seeded.Random.nextInteger()', () => {
    it('must return a integer value between minimum and maximum value (inclusively)', () => {
        fc.assert(fc.property(fc.maxSafeInteger(), fc.maxSafeInteger(), fc.maxSafeInteger(), (seed, a, b) => {
            let rand1 = new Seeded.Random(seed);
            let rand2 = new Seeded.Random(seed);
            let min = Math.min(a, b);
            let max = Math.max(a,b);

            let randVal1 = rand1.nextInteger(min, max);
            let randVal2 = rand2.nextInteger(min, max);

            expect(randVal1).toBeGreaterThanOrEqual(min);
            expect(randVal1).toBeLessThanOrEqual(max);
            expect(Number.isInteger(randVal1)).toBe(true);

            expect(randVal2).toBeGreaterThanOrEqual(min);
            expect(randVal2).toBeLessThanOrEqual(max);
            expect(Number.isInteger(randVal2)).toBe(true);
        }));
    });
});

describe('Seeded.Random.nextFloat()', () => {
    it('must return a float value between minimum and maximum value (inclusively)', () => {
        fc.assert(fc.property(fc.maxSafeInteger(), fc.float({noDefaultInfinity: true, noNaN: true}), fc.float({noDefaultInfinity: true, noNaN: true}), (seed, a, b) => {
            let rand1 = new Seeded.Random(seed);
            let rand2 = new Seeded.Random(seed);

            let min = Math.min(a, b);
            let max = Math.max(a,b);
            let randVal1 = rand1.nextFloat(min, max);
            let randVal2 = rand2.nextFloat(min, max);

            expect(randVal1).toBeGreaterThanOrEqual(min);
            expect(randVal1).toBeLessThanOrEqual(max);
            expect(randVal2).toBeGreaterThanOrEqual(min);
            expect(randVal2).toBeLessThanOrEqual(max);
        }));
    });
});
