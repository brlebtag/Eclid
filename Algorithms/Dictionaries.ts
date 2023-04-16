import { Indexer, TKey } from "../Common";

export interface Valuer<T, V> {
    (T): V
}

export function dictionary<T>(elements: T[], key: Indexer<T>): Record<TKey, T> {
    let dict: Record<TKey, T> = {} as Record<TKey, T>;
    let len = elements.length;

    for (let i = 0; i < len; i++) {
        dict[key(elements[i])] = elements[i];
    }

    return dict;
}


export function project<T, V>(elements: T[], key: Indexer<T>, valuer: Valuer<T, V>): Record<TKey, V> {
    let dict: Record<TKey, V> = {} as Record<TKey, V>;
    let len = elements.length;

    for (let i = 0; i < len; i++) {
        dict[key(elements[i])] = valuer(elements[i]);
    }

    return dict;
}