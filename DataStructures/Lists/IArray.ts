export default interface IArray<T> extends Iterable<T> {
    [index: number]: T;
    get length(): number;
}