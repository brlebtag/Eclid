import { Indexer, TKey } from "../Common";

export function dictionary<T>(elements: T[], key: Indexer<T>): Record<TKey, T> {
    let dict: Record<TKey, T> = {} as Record<TKey, T>;
    let len = elements.length;

    for (let i = 0; i < len; i++) {
        dict[key(elements[i])] = elements[i];
    }

    return dict;
}
