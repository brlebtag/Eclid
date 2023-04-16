import IHeap from './IHeap';
import { Comparator } from '../../Common';
import { parentNodeIndex, leftNodeIndex, rightNodeIndex, swap } from '../../Algorithms/Arrays';

// https://www.youtube.com/@sithdev8206/videos
// Fibonacci heap: https://www.youtube.com/watch?v=6JxvKfSV9Ns&ab_channel=SithDev

export default class BinaryHeap<T> implements IHeap<T> {
    storage: T[];
    comparator: Comparator<T>;
    /**
     * The Heap will be minimum by default but it can be changed based on Comparator<T>'s return.
     * (a, b) => a - b // to min-heap
     * (a, b) => b - a // to max-heap
     */
    constructor(comparator: Comparator<T>, elements: T[] = []) {
        this.comparator = comparator;
        this.storage = elements;
        this.heapify();
    }

    heapify() {
        let maxSize: number = Math.floor(this.storage.length / 2) - 1;
        // start from the last non-leaf nodes and bubble down until the root.
        for (let i = maxSize; i >= 0; i--) {
            this.bubbleDown(i); //heapify
        }
    }

    push(data: T): void {
        this.storage.push(data);
        this.bubbleUp(this.storage.length - 1);
    }

    pop(): T {
        if (this.storage.length <= 0) return null as T;

        let result: T = this.storage[0];

        if (this.storage.length > 1) {
            swap(this.storage, 0, this.storage.length - 1);
            this.storage.pop();
            this.bubbleDown(0);
        } else {
            this.storage.pop();
        }

        return result;
    }

    top(): T {
        return this.storage.length <= 0? null : this.storage[0];
    }

    update(data: T): void {
        let index = this.storage.indexOf(data);

        if (index !== -1) {
            let parentIndex = parentNodeIndex(index);
            if (parentIndex != -1 && this.comparator(this.storage[index], this.storage[parentIndex]) < 0) {
                this.bubbleUp(index); // I'm bigger than my parent ...
            } else {
                this.bubbleDown(index); // then I might be smaller than my siblings...
            }
        }
    }

    clear() {
        this.storage = [];
    }

    empty(): boolean {
        return this.storage.length <= 0;
    }

    get length(): number {
        return this.storage.length;
    }

    private bubbleUp(index: number): number {
        let value: T = this.storage[index];
        let parentIndex: number = parentNodeIndex(index);
        let compare = this.comparator;

        while(index > 0 && compare(value, this.storage[parentIndex]) < 0) {
            this.storage[index] = this.storage[parentIndex];
            index = parentIndex;
            parentIndex = parentNodeIndex(index);
        }

        this.storage[index] = value;
        return index;
    }

    private bubbleDown(index: number): number {
        let value: T = this.storage[index];
        let end = this.storage.length - 1;
        let lower = index;
        let lowerValue: T = value;
        let compare = this.comparator;

        while (index < end) {
            let indexLeft: number = leftNodeIndex(index);
            let indexRight: number = rightNodeIndex(index);

            if (indexLeft <= end && compare(lowerValue, this.storage[indexLeft]) >= 0) {
                lower = indexLeft;
                lowerValue = this.storage[indexLeft];
            }

            if (indexRight <= end && compare(lowerValue, this.storage[indexRight]) >= 0) {
                lower = indexRight;
                lowerValue = this.storage[indexRight];
            }

            if (lower != index) {
                this.storage[index] = lowerValue;
                index = lower;
                lowerValue = value;  // reset lowerValue to value
                continue;
            }

            break;
        }

        this.storage[index] = value;
        return index;
    }
}