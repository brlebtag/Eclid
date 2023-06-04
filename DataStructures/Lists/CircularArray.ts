import { shiftIndex } from "../../Algorithms/Arrays";

// https://embeddedartistry.com/blog/2017/05/17/creating-a-circular-buffer-in-c-and-c/
// https://ferrous-systems.com/blog/lock-free-ring-buffer/
// https://en.wikipedia.org/wiki/Circular_buffer

export default class CircularArray<T> {
    private storage: T[];
    private _capacity: number;
    private begin: number;
    private end: number;

    constructor(capacity: number, elements: any[] = null) {
        if (elements.length > capacity) {
            throw new Error("Capacity must be bigger than or equal to elements array size.");
        }

        if (elements === null) {
            elements = new Array(capacity);
        }

        this._capacity = capacity;
        this.storage = elements;
        this.clear();
    }

    clear(): void {
        this.begin = this.end = -1;
    }

    front(): T {
        const begin = this.begin;
        if (begin === this.end) return undefined;
        return this.storage[begin];
    }

    back(): T {
        const end = this.end;
        if (end === this.begin) return undefined;
        return this.storage[end];
    }

    // insert at the end
    push(value: T): void {
        if (this.begin === -1) {
            this.begin = this.end = 0;
            this.storage[0] = value;
        } else {

        }
    }

    // insert at the beginning
    unshift(value: T): void {
        if (this.begin === -1) {
            this.begin = this.end = 0;
            this.storage[0] = value;
        } else {

        }
    }
    
    // remove at the end
    pop(): T {
        
    }

    // remove at the beginning
    shift(): T {
        
    }

    at(index: number): T {
        const capacity = this._capacity;
        index += this.begin;
        if (index >= 0) return this.storage[index % capacity]; // shift right
        let newIndex = capacity - ((-index) % capacity); // shift to left
        return this.storage[newIndex == capacity ? 0 : newIndex];
    }

    get length(): number {
        const end = this.end;
        const begin = this.begin;

        if (begin === end) return 0;
        if (end >= begin) return (end - begin + 1);
        return (end + 1) + (this._capacity - begin);
    }
    
    get capacity(): number {
        return this._capacity;
    }

    full(): boolean {
        return this.begin !== this.end;
    }

    empty() {
        return this.begin === this.end;
    }
}