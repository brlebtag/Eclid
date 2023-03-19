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

export interface Rectangle {
    x: number;
    width: number;
    y: number;
    height: number;
}

export interface Circle {
    x: number,
    y: number,
    radius: number,
}

export interface Collider {
    (point: Vector2D): boolean;
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