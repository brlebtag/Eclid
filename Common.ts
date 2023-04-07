export type Key = string | number;
export type BigKey = string | number | symbol;

export interface Comparator<T> {
    (x: T, y: T): number;
}

export interface Vector2D {
    x: number;
    y: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Rectangle extends Vector2D {
    width: number;
    height: number;
}

export interface Circle extends Vector2D {
    radius: number,
}

export interface Collider {
    (point: Vector2D): boolean;
}

export interface Bound {
    beginX: number;
    beginY: number;
    endX: number;
    endY: number;
}

export interface Dimension {
    width: number;
    height: number;
}

export interface Indexer<T> {
    (t: T): Key
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

export function key(v: Vector2D): string {
    return `${v.x}#${v.y}`;
}
