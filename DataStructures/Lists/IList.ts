// https://basarat.gitbook.io/typescript/future-javascript/iterators

export default interface IList<T> {    
    at(index: number): T;
    insert(index: number, data: T): boolean;
    remove(index: number): T;
    clear(): void;
    get capacity(): number;
    get length(): number;
}