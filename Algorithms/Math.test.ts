import * as fc from 'fast-check';
import { map, constrain, normalize, lerp, square, clamp, sat } from './Math';
import { Random } from './Random';

describe('map()', () => {
    it('must return a value x in [B1, E1] between [B2, E2]', () => {
        fc.assert(fc.property(fc.integer(), fc.integer(), fc.integer(), fc.integer(), (a, b, c, d) => {
            let b1 = Math.min(a, b);
            let e1 = Math.max(a, b);
            let b2 = Math.min(c, d);
            let e2 = Math.max(c, d);

            let value = Random.nextInteger(b1, e1);
            let newValue = map(value, b1, e2, b2, e2);

            expect(newValue).toBeGreaterThanOrEqual(b2);
            expect(newValue).toBeLessThanOrEqual(e2);            
        }))
    });
});

describe('constrain()', () => {
    it('must return a value x between [B, E]', () => {
        fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => {
            b = Math.min(a, b);
            let e = Math.max(a, b);

            let value = Random.nextInteger(b - 100, e + 100);
            let newValue = constrain(value, b, e);

            expect(newValue).toBeGreaterThanOrEqual(b);
            expect(newValue).toBeLessThanOrEqual(e);            
        }))
    });
});

describe('normalize()', () => {
    it('must return a value x between [0, 1]', () => {
        fc.assert(fc.property(fc.integer(), fc.integer(), (a1, b1) => {
            let b = Math.min(a1, b1);
            let e = Math.max(a1, b1) + 1; // to be at least 1 more than begin

            let value = Random.nextFloat(b, e);
            let newValue = normalize(value, b, e);

            expect(newValue).toBeGreaterThanOrEqual(0);
            expect(newValue).toBeLessThanOrEqual(1);
        }))
    });
});

describe('square()', () => {
    it('must return a value x between [0, 1]', () => {
        fc.assert(fc.property(fc.integer({min: -10000, max: 1000}), fc.integer({min: -10000, max: 1000}), (a1, b1) => {
            let b = Math.min(a1, b1);
            let e = Math.max(a1, b1);

            let value = Random.nextInteger(b, e);
            let newValue = square(value);

            expect(newValue).toBe(Math.pow(value, 2))
        }))
    });
});


describe('lerp()', () => {
    it('must return a value x between [0, 1] lerped by y', () => {
        fc.assert(fc.property(fc.float({min: 0, max: 1}), y => {
            let x = lerp(0, 1, y);
            expect(x).toBe(y);
        }))
    });
});

describe('clamp()', () => {
    it('must return a value x between [0, 1] lerped by y', () => {
        fc.assert(fc.property(fc.integer({min: 0, max: 10_000}), y => {
            let x = clamp(y, 100, 9_000);
            expect(x).toBeGreaterThanOrEqual(100);
            expect(x).toBeLessThanOrEqual(9_000);
        }))
    });
});

describe('sat()', () => {
    it('must return a value x between [0, 1] lerped by y', () => {
        fc.assert(fc.property(fc.float({min: -1.0, max: 2.0}), y => {
            let x = sat(y);
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(1);
        }))
    });
});