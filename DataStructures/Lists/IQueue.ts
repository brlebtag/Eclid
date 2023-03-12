export default interface IQueue<T> {
    enqueue(value: T): void;
    dequeue(value: T): T;
    front(): T;
    back(): T;
    clear(): void;
    get length(): number;
}