import * as fc from "fast-check";
import { dictionary, project } from "./Dictionaries";

describe('dictionary<T>()', () => {
    it('must convert an array to dictionary with keys as informed and values equal to the values from array', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let dict = dictionary(arr, k => k);
            let containsAll = true;

            for (const el of arr) {
                containsAll &&= dict[el] !== undefined;
            }

            expect(Object.keys(dict).length).toBeLessThanOrEqual(arr.length); // same values are mapped to the same keys. e.g. arr =[26, 26]
            expect(containsAll).toBe(true);
        }));
    });
});


describe('project<T>()', () => {
    it('must convert an array to dictionary with keys as informed and values as informed', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {

            let dict = project(arr.map(el => ({id: el})), el => el.id, el => el.id);
            let containsAll = true;

            for (const el of arr) {
                containsAll &&= dict[el] !== undefined;
            }

            expect(Object.keys(dict).length).toBeLessThanOrEqual(arr.length); // same values are mapped to the same keys. e.g. arr =[26, 26]
            expect(containsAll).toBe(true);
        }));
    });
});