import IHeap from './IHeap';

function parent(index: number): number{
    return Math.ceil(index / 2.0) - 1;
}

function left(index: number): number {
    return 2 * index + 1;
}

function right(index: number): number {
    return 2 * index + 2;
}

function swap<T>(data: T[], i: number, j: number) {
    let temp = data[j];
    data[j] = data[i];
    data[i] = temp;
}

interface Comparator<T> {
    (x: T, y: T): number;
}

export default class BinaryHeap<T> implements IHeap<T> {
    storage: T[];
    comparator: Comparator<T>;
    /**
     * The Heap will be minimum by default but it can be changed based on Comparator<T>'s return.
     * (a, b) => a - b // to min-heap
     * (a, b) => b - a // to max-heap
     */
    constructor(comparator: Comparator<T>) {
        this.comparator = comparator;        
    }

    push(data: T) {

    }
    pop(): T {
        
    }
    top(): T {

    }
    length(): number {

    }
    empty(): number {

    }

    private bubbleUp(index: number): void {
        let value = this.storage[index];
        let parentIndex = parent(index);
        let parentValue = this.storage[parentIndex];

        // if father is lower than son's value
        while(index >= 0 && this.comparator(value, parentValue) < 0)
        {
            this.storage[index] = parentValue;
            index = parentIndex;
            parentIndex = parent(index);
            parentValue = this.storage[parentIndex];
        }

        this.storage[index] = value;
    }

    private bubbleDown(startIndex: number): void {

    }
}