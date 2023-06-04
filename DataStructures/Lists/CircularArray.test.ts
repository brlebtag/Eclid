import * as fc from 'fast-check';
import CircularArray from './CircularArray';


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
        fc.assert(fc.property(fc.array(fc.integer()), fc.array(fc.integer()), (arr, newArr) => {
            let cirArr = new CircularArray(arr.length, arr);

            for (let i = 0; i < newArr.length; i++) {
                cirArr.push(newArr[i]);
            }

            if (arr.length > newArr.length) {
                for (let i = 0; i < newArr.length; i++) {
                    expect(cirArr.at(i)).toBe(newArr[i]);
                }

                for (let i = newArr.length; i < arr.length; i++) {
                    expect(cirArr.at(i)).toBe(arr[i]);
                }
            } else {
                let  j = 0;
                for (let i = arr.length; i < newArr.length; i++, j++) {
                    expect(cirArr.at(j)).toBe(newArr[i]);
                }
            }
        }));
    });
});