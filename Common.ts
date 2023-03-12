export interface Comparator<T> {
    (x: T, y: T): number;
}

export interface Vector2D {
    x: number;
    y: number;
}

export function ascending(x:number, y:number) :number {
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}

export function descending(x: number, y: number): number {
    if (y < x) return -1;
    if (y > x) return 1;
    return 0;
}

export function compare(x:number, y:number) :number {
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}