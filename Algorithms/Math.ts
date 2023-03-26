import { Vector2D } from '../Common';

// http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

export function euclidian(node: Vector2D, target: Vector2D, cost: number = 1): number {
    return cost * Math.sqrt(((target.x - node.x) * (target.x - node.x)) + ((target.y - node.y) * (target.y - node.y)));
}

export function manhattan(node: Vector2D, target: Vector2D, cost: number = 1): number {
    let dx = Math.abs(node.x - target.x);
    let dy = Math.abs(node.y - target.y);
    return cost * (dx + dy);
}

export function diagonal(node: Vector2D, target: Vector2D, cost: number = 1, cost_diagonal: number = 1): number {
    let dx = Math.abs(node.x - target.x);
    let dy = Math.abs(node.y - target.y);
    return cost * (dx + dx) + (cost_diagonal - 2 * cost) * Math.min(dx, dy);
}

export function octile(node: Vector2D, target: Vector2D): number {
    // sqrt(2) ~= 1.4
    // return diagonal(node, target, 1, 1.4);
    let dx = Math.abs(node.x - target.x);
    let dy = Math.abs(node.y - target.y);
    return (dx + dx) - 0.6 * Math.min(dx, dy);
}

export function chebyshev(node: Vector2D, target: Vector2D) {
    // return diagonal(node, target, 1, 1);
    let dx = Math.abs(node.x - target.x);
    let dy = Math.abs(node.y - target.y);
    return (dx + dx) - Math.min(dx, dy);
}

export function constrain(value: number, minimum: number, maximum: number): number {
    return Math.max(Math.min(value, maximum), minimum);
}

export function map(value: number, begin1: number, end1: number, begin2: number, end2: number, constrained: boolean = true) {
    const newValue = (value - begin1) / (end1 - begin1) * (end2 - begin2) + begin2;

    if (!constrained) return newValue;

    return begin2 < end2
        ? constrain(newValue, begin2, end2)
        : constrain(newValue, end2, begin2);
}

export function normalize(value: number, begin: number, end: number): number {
    return map(value, begin, end, 0, 1);
}

export function square(value: number) {
    return value * value;
}

export function fractional(value: number): number {
    let sign = 0;

    if (Math.abs(value) === Infinity) return value;

    if (value < 0) {
        value = -value;
        sign = 1;
    }

    let sValue = String(value);

    if (sValue.includes('.') && !sValue.includes('e')) {
        return Math.abs(sign - Number('0' + sValue.slice(sValue.indexOf('.'))));
    } else if (value < 1) {
        return Math.abs(sign - value);
    }

    return 0;
}

export function lerp(begin: number, end: number, percentage: number): number {
    return percentage * (end - begin) + begin;
}

export function clamp(value: number, begin: number, end: number): number {
    return Math.min(Math.max(value, begin), end);
}

export function sat(value: number): number {
    return Math.min(Math.max(value, 0.0), 1.0);
}
