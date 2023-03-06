export default interface Heap<T> {
    push(data: T);
    pop(): T;
    top(): T;
    length(): number;
    empty(): number;
}