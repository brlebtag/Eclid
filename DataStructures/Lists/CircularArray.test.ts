import * as fc from 'fast-check';
import CircularArray from './CircularArray';
import { Seeded } from '../../Algorithms/Random';
import { clamp } from '../../Algorithms/Math';


describe('CircularArray.at()', () => {
    it('must get element circularly in a array', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let cirArr = new CircularArray(arr.length, arr);

            // normal
            for (let i = 0; i < arr.length; i++) {
                expect(cirArr.at(i)).toBe(arr[i]);
            }

            // forward
            for (let i = 0; i < arr.length; i++) {
                expect(cirArr.at(arr.length + i)).toBe(arr[i]);
            }

            // backward
            for (let i = 1; i < arr.length; i++) {
                expect(cirArr.at(-i)).toBe(arr[arr.length - i]);
            }
        }));
    });
});

describe('CircularArray.push()', () => {
    it('must insert element circularly at the current end of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer(), {minLength: 1}), fc.array(fc.integer()), (arr, newArr) => {
            let cirArr = new CircularArray(arr.length, arr);

            for (let i = 0; i < newArr.length; i++) {
                cirArr.push(newArr[i]);
            }

            let j;

            if (arr.length > newArr.length) {
                // equal to the old one...
                j = 0;
                for (let i = newArr.length; i < arr.length; i++, j++) {
                    expect(cirArr.at(j)).toBe(arr[i]);
                }

                // equal to the new one...
                j = arr.length - newArr.length;
                for (let i = 0; i < newArr.length; i++, j++) {
                    expect(cirArr.at(j)).toBe(newArr[i]);
                }
            } else {
                // I'm checking only the last segment. Presumably everything else will be right...
                let j = 0;
                for (let i = newArr.length - arr.length; i < newArr.length; i++, j++) {
                    expect(cirArr.at(j)).toBe(newArr[i]);
                }
            }            
        }));
    });
});

describe('CircularArray.pop()', () => {
    it('must remove element at the current end of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer(), {minLength: 1}), fc.integer(), (arr, seed) => {
            let len = arr.length;
            let cirArr = new CircularArray(len, arr);
            let rand = new Seeded.Random(seed);
            
            let toBeRemoved = clamp(rand.nextInteger(0, len + 1), 0, len);
            for (let i = 0; i < toBeRemoved; i++) cirArr.pop();

            let newLen = len - toBeRemoved;
            
            for (let i = 0; i < newLen; i++) expect(cirArr.at(i)).toBe(arr[i]);
            for (let i = newLen; i < len; i++) expect(cirArr.at(i)).toBe(undefined);
        }));
    });
});


describe('CircularArray.unshift()', () => {
    it('must insert element circularly at the current end of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer(), {minLength: 1}), fc.array(fc.integer()), (arr, newArr) => {
            let cirArr = new CircularArray(arr.length, arr);

            let j;

            for (let i = 0; i < newArr.length; i++) {
                cirArr.unshift(newArr[i]);
            }

            if (arr.length > newArr.length) {
                // equal to the old one...
                j = 0;
                for (let i = newArr.length; i < arr.length; i++, j++) {
                    expect(cirArr.at(i)).toBe(arr[j]);
                }
                
                // equal to the new one...
                j = 0;
                for (let i = newArr.length -1; i >= 0; i--, j++) {
                    expect(cirArr.at(j)).toBe(newArr[i]);
                }
            } else {
                // I'm checking only the last segment. Presumably everything else will be right...
                j = 0;
                let len = newArr.length - arr.length
                for (let i = newArr.length - 1; i >= len; i--, j++) {
                    expect(cirArr.at(j)).toBe(newArr[i]);
                }
            }
        }));
    });
});


describe('CircularArray.shift()', () => {
    it('must remove element at the current begin of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer(), {minLength: 1}), fc.integer(), (arr, seed) => {
            let len = arr.length;
            let cirArr = new CircularArray(len, arr);
            let rand = new Seeded.Random(seed);
            
            let toBeRemoved = clamp(rand.nextInteger(0, len + 1), 0, len);
            for (let i = 0; i < toBeRemoved; i++) cirArr.shift();
            let j = toBeRemoved;
            for (let i = 0; i < toBeRemoved; i++, j++) expect(cirArr.at(i)).toBe(arr[j]);
            for (let i = len - toBeRemoved; i < len; i++) expect(cirArr.at(i)).toBe(undefined);
        }));
    });
});