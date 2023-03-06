import { Vector } from '../../Common';

// http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

export function euclidian(node: Vector, target: Vector, cost: number = 1): number {
    return cost * Math.sqrt(((target.x - node.x) * (target.x - node.x)) + ((target.y - node.y) * (target.y - node.y)));
}

export function manhattan(node: Vector, target: Vector, cost: number = 1): number {
    let dx = Math.abs(node.x - target.x);
    let dy = Math.abs(node.y - target.y);
    return cost * (dx + dy);
}

export function diagonal(node: Vector, target: Vector, cost: number = 1, cost_diagonal: number = 1): number {
    let dx = Math.abs(node.x - target.x);
    let dy = Math.abs(node.y - target.y);
    return cost * (dx + dx) + (cost_diagonal - 2 * cost) * Math.min(dx, dy);
}

export function octile(node: Vector, target: Vector): number {
    // sqrt(2) ~= 1.4
    return diagonal(node, target, 1, 1.4);
}

export function chebyshev(node: Vector, target: Vector) {
    return diagonal(node, target, 1, 1);
}