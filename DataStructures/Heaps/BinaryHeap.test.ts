import * as fc from "fast-check";
import { ascending, descending } from "../../Common";
import BinaryHeap from "./BinaryHeap";

describe('BinaryHeap', () => {
    it('must be able to sort an array ascending using the binary heap', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let heap = new BinaryHeap<number>(ascending);
            let sorted = [...arr].sort(ascending);

            for (const el of arr) {
                heap.push(el);
            }

            let ordered = [];

            while (!heap.empty()) {
                ordered.push(heap.pop());
            }

            expect(ordered).toEqual(sorted);
        }));
    });

    it('must be able to sort an array ascending using the binary heap but using heap constructor', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let sorted = [...arr].sort(ascending);
            let heap = new BinaryHeap<number>(ascending, arr);

            let ordered = [];

            while (!heap.empty()) {
                ordered.push(heap.pop());
            }

            expect(ordered).toEqual(sorted);
        }));
    });

    it('must be able to sort an array descending using the binary heap', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let heap = new BinaryHeap<number>(descending);
            let sorted = [...arr].sort(descending);

            for (const el of arr) {
                heap.push(el);
            }

            let ordered = [];

            while (!heap.empty()) {
                ordered.push(heap.pop());
            }

            expect(ordered).toEqual(sorted);
        }));
    });

    it('must be able to sort an array descending using the binary heap but using heap constructor', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let sorted = [...arr].sort(descending);
            let heap = new BinaryHeap<number>(descending, arr);

            let ordered = [];

            while (!heap.empty()) {
                ordered.push(heap.pop());
            }

            expect(ordered).toEqual(sorted);
        }));
    });

    it('must be able to change priority and maintain the array sorted', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let arrObj = arr.map(el => ({id: el}));
            let heap = new BinaryHeap<{id: number}>((a, b) => ascending(a.id, b.id), arrObj);
            let len = Math.floor(arr.length/2);

            for (let i = Math.floor(len/2); i < len; i++) {
                const e = arrObj[i];
                e.id *= 2;
                heap.update(e);
            }

            let ordered: {id: number}[] = [];

            while (!heap.empty()) {
                ordered.push(heap.pop());
            }

            let prev = null;

            if (ordered.length > 1) {
                prev = ordered[1];
            }

            for (let i = 1; i < ordered.length; i++) {
                const e: {id: number} = ordered[i];
                expect(prev.id).toBeLessThanOrEqual(e.id);
            }

            if (ordered.length <= 0) {
                expect(prev).toBe(null);
            }            
        }));
    });
});