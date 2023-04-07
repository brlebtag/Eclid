import { Indexer, Key } from "../Common";

export function dictionary<T>(elements: T[], key: Indexer<T>): Record<Key, T> {
    let dict: Record<Key, T> = {} as Record<Key, T>;
    let len = elements.length;

    for (let i = 0; i < len; i++) {
        dict[key(elements[i])] = elements[i];
    }

    return dict;
}
