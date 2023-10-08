import { shiftIndex } from "../../Algorithms/Arrays";

// https://embeddedartistry.com/blog/2017/05/17/creating-a-circular-buffer-in-c-and-c/
// https://ferrous-systems.com/blog/lock-free-ring-buffer/
// https://en.wikipedia.org/wiki/Circular_buffer

export default class CircularArray<T> {
    private _storage: T[];
    private _capacity: number;
    private _begin: number; // points to the first element in the circular array
    private _end: number; // points to the next available (free) spot
    private _total: number; // total elements

    constructor(capacity: number, elements: any[] = null) {
        this._storage = new Array(capacity);
        this._capacity = capacity;
        this._begin = this._end = this._total = 0;

        if (elements) {
            if (elements.length > capacity) {
                throw new Error("Capacity must be bigger than or equal to elements array size.");
            }

            let len = elements.length;
            const storage = this._storage;
            for (let i = 0; i < len; i++) {
                storage[i] = elements[i];
            }
            this._total = elements.length;
            this._end = elements.length % this._capacity;
        }
    }

    public reset(): void {
        this._total = this._begin = this._end = 0;
    }

    public clean() {
        this._storage.fill(undefined);
    }

    public clear() {
        this.reset();
        this.clean();
    }

    public skipFront(num: number): void {
        num = Math.min(num, this._total);
        if (num <= 0) return;
        const storage = this._storage;
        const capacity = this._capacity;
        let i, n;
        for (i = this._begin, n = 0; n < num; (i = (i + 1) % capacity), n++) {
            storage[i] = undefined;
        }
        this._total -= num;
        this._begin = i;
    }

    public skipBack(num: number): void {
        num = Math.min(num, this._total);
        if (num <= 0) return;

        const storage = this._storage;
        const capacity = this._capacity;
        let n, i = this._end - 1;
        if (i < 0) {
            i = capacity - 1;
        }
        for (n = 0; n < num; n++) {
            storage[i] = undefined;
            i = i - 1;
            if (i < 0) {
                i = capacity - 1;
            }
        }
        this._total -= num;
        this._end = i;
    }

    public set(index: number, value: T): void {
        const capacity = this._capacity;
        index += this._begin;
        if (index >= 0) {
            this._storage[index % capacity] = value; // shift right
            return;
        }
        let newIndex = capacity - ((-index) % capacity); // shift to left
        this._storage[newIndex === capacity ? 0 : newIndex] = value;
    }

    public front(): T {
        if (this._total === 0) return undefined; // empty
        return this._storage[this._begin];
    }

    public back(): T {
        if (this._total === 0) return undefined; // empty
        let index = this._end - 1;
        if (index < 0) {
            index = this._capacity - 1;
        }
        return this._storage[index];
    }

    // insert at the end
    public push(value: T): void {
        const capacity = this._capacity;
        const end = this._end;
        this._storage[end] = value;
        this._end = (end + 1) % capacity;
        this._total++;
        if (this._total >= capacity) {
            this._begin = (this._begin + 1) % capacity;
            this._total = capacity;
        }
    }

    // insert at the beginning
    public unshift(value: T): void {
        const capacity = this._capacity;
        this._begin--;
        if (this._begin < 0) {
            this._begin = this._capacity - 1; // go to the end
        }
        this._storage[this._begin] = value;
        this._total++;
        if (this._total >= capacity) {
            this._end--;
            this._total = capacity;
            if (this._end < 0) {
                this._end = capacity - 1;
            }
        }
    }
    
    // remove at the end
    public pop(): T {
        const capacity = this._capacity;
        this._end--;
        if (this._end < 0) {
            this._end = capacity - 1;
        }
        let el = this._storage[this._end];
        this._storage[this._end] = undefined; // empty the slot
        this._total--;
        return el;
    }

    // remove at the beginning
    public shift(): T {
        const capacity = this._capacity;
        let el = this._storage[this._begin];
        this._storage[this._begin] = undefined; // empty the slot
        this._begin = (this._begin + 1) % capacity;
        this._total--;
        return el;
    }

    public at(index: number): T {
        const capacity = this._capacity;
        index += this._begin;
        if (index >= 0) return this._storage[index % capacity]; // shift right
        let newIndex = capacity - ((-index) % capacity); // shift to left
        return this._storage[newIndex === capacity ? 0 : newIndex];
    }

    public get(index: number): T {
        return this._storage[index];
    }

    public get length(): number {
        return this._total;
    }
    
    public get capacity(): number {
        return this._capacity;
    }

    public full(): boolean {
        return this._total === this._capacity;
    }

    public empty() {
        return this._total === 0;
    }

    public get begin() {
        return this._begin;
    }
    
    public get end() {
        return this._end;
    }
}