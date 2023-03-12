import { shiftIndex } from "../../Algorithms/Arrays";
import IList from "./IList";
import IStack from "./IStack";
import IQueue from "./IQueue";

// https://www.programiz.com/dsa/circular-queue

export default class CircularArray<T> implements IList<T>, IStack<T>, IQueue<T> {
    private storage: T[];
    private _capacity: number;
    private begin: number;
    private end: number;

    constructor(capacity: number, elements: any[] = []) {
        if (elements.length <= capacity) {
            throw new Error("Capacity must be bigger than or equal to elements array size.");
        }

        this._capacity = capacity;
        this.storage = elements;
        this.begin = 0; // inclusive
        this.end = 0; // inclusive
    }

    insert(index: number, data: T): boolean {
        throw new Error("Method not implemented.");
    }

    remove(index: number): T {
        throw new Error("Method not implemented.");
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }

    front(): T {
        if (this.empty()) return null as T;
    }

    back(): T {
        if (this.empty()) return null as T;
    }

    push(value: T): void {
        if (this.full) {

        }
    }
    
    pop(value: T): T {
        if (this.empty()) return null as T;
    }

    enqueue(value: T): void {

    }

    dequeue(value: T): T {
        if (this.empty()) return null as T;
    }

    at(index: number): T {
        
    }

    get length(): number {
        if (this.end > this.begin) {
            return this.end - this.begin;
        } else {
            return ((this.end + 1) + (this.storage.length - this.begin));
        }
    }
    
    get capacity(): number {
        return this._capacity;
    }

    full(): boolean {
        return this.length == this._capacity;
    }

    empty() {
        return this.begin == this.end;
    }
}