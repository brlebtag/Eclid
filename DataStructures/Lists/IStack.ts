export default interface IStack<T> {
    front(): T;
    push(value: T): void;
    pop(value: T): T;
    clear(): void;
    get length(): number;
}