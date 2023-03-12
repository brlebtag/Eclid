export default interface Heap<T> {
    push(data: T): void;
    pop(): T;
    top(): T;
    clear(): void;
    empty(): boolean;
    heapify(): void;
    get length(): number;
}