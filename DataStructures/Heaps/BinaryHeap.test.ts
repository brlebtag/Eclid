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
});