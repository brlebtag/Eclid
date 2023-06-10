import { shiftIndex } from "../../Algorithms/Arrays";

// https://embeddedartistry.com/blog/2017/05/17/creating-a-circular-buffer-in-c-and-c/
// https://ferrous-systems.com/blog/lock-free-ring-buffer/
// https://en.wikipedia.org/wiki/Circular_buffer

export default class CircularArray<T> {
    private storage: T[];
    private _capacity: number;
    private begin: number; // points to the first element in the circular array
    private end: number; // points to the next available (free) spot
    private total: number; // total elements

    constructor(capacity: number, elements: any[] = null) {
        this.storage = new Array(capacity);
        this._capacity = capacity;
        this.begin = this.end = this.total = 0;

        if (elements) {
            if (elements.length > capacity) {
                throw new Error("Capacity must be bigger than or equal to elements array size.");
            }

            let len = elements.length;
            const storage = this.storage;
            for (let i = 0; i < len; i++) {
                storage[i] = elements[i];
            }
            this.total = elements.length;
            this.end = elements.length % this._capacity;
        }
    }

    clear(): void {
        this.total = this.begin = this.end = 0;
    }

    front(): T {
        if (this.total === 0) return undefined; // empty
        return this.storage[this.begin];
    }

    back(): T {
        if (this.total === 0) return undefined; // empty
        return this.storage[this.end];
    }

    // insert at the end
    push(value: T): void {
        const _capacity = this._capacity;
        const end = this.end;
        this.storage[end] = value;
        this.end = (end + 1) % _capacity;
        this.total++;
        if (this.total >= _capacity) {
            this.begin = (this.begin + 1) % _capacity;
            this.total = _capacity;
        }
    }

    // insert at the beginning
    unshift(value: T): void {
        const _capacity = this._capacity;
        this.begin--;
        if (this.begin < 0) {
            this.begin = this._capacity - 1; // go to the end
        }
        this.storage[this.begin] = value;
        this.total++;
        if (this.total >= _capacity) {
            this.end--;
            this.total = _capacity;
            if (this.end < 0) {
                this.end = _capacity - 1;
            }
        }
    }
    
    // remove at the end
    pop(): T {
        const _capacity = this._capacity;
        this.end--;
        if (this.end < 0) {
            this.end = _capacity - 1;
        }
        let el = this.storage[this.end];
        this.storage[this.end] = undefined; // empty the slot
        this.total--;
        return el;
    }

    // remove at the beginning
    shift(): T {
        const _capacity = this._capacity;
        let el = this.storage[this.begin];
        this.storage[this.begin] = undefined; // empty the slot
        this.begin = (this.begin + 1) % _capacity;
        this.total--;
        return el;
    }

    at(index: number): T {
        const capacity = this._capacity;
        index += this.begin;
        if (index >= 0) return this.storage[index % capacity]; // shift right
        let newIndex = capacity - ((-index) % capacity); // shift to left
        return this.storage[newIndex === capacity ? 0 : newIndex];
    }

    get length(): number {
        return this.total;
    }
    
    get capacity(): number {
        return this._capacity;
    }

    full(): boolean {
        return this.total === this._capacity;
    }

    empty() {
        return this.total === 0;
    }
}