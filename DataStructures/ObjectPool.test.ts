import ObjectPool from "./ObjectPool";
import * as fc from 'fast-check';

describe('ObjectPool', () => {
    it('must be able to create new objects and return reused ones', () => {

        var pool = new ObjectPool<number[]>(() => ([]));

        var array = pool.acquire();
        let i;

        for (i = 0; i < 10; i++) {
            array.push(i);
        }

        pool.release(array);

        let j = 0;

        let same = true;

        for (const i of array) {
            same &&= i == j;
            j++;
        }

        expect(same).toBe(true);
        expect(j).toBe(i);
    });
});