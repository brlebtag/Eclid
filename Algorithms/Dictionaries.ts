type K = string | number | symbol;

interface Key<T> {
    (t: T): K;
}

export function dictionary<T>(elements: T[], key: Key<T>): Record<K, T> {
    let dict: Record<K, T> = {} as Record<K, T>;
    let len = elements.length;

    for (let i = 0; i < len; i++) {
        dict[key(elements[i])] = elements[i];
    }

    return dict;
}