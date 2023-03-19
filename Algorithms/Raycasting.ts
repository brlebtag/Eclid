import { Vector2D, Collider } from "../Common";

interface RaycastResult {
    collided: boolean;
    where: Vector2D;
    path: Vector2D[];
}

/**
 * Return a list of points/vectors of a line
 * 
 * The ideia is:
 * 
 * The formula to find x and y given two vectors (10, 20) and (50, 80) is: y = mx + b
 * 
 * where m is equal to (y2 - y1) / (x2 - x1)
 * 
 * so in the example we have:
 * 
 * y = (80 -20) / (50 - 10)x + b = 1.5x + b
 * 
 * if we apply (x: 10, y: 20), we have => y = 1.5x + b => 20 = 1.5*10 + b => b = 20 - 15 = 5
 * 
 * @param point1 Vector2D
 * @param point2 Vector2D
 * @returns Vector2D[]
 */
export function naiveLine(point1: Vector2D, point2: Vector2D): Vector2D[] {
    let {x: x1, y: y1 } = point1;
    let {x: x2, y: y2 } = point2;
    let rise = y2 - y1;
    let run = x2 - x1;
    let minX = Math.min(x1, x2);
    let maxX = Math.max(x1, x2);
    let minY = Math.min(y1, y2);
    let maxY = Math.min(y1, y2);
    let linePoints: Vector2D[] = [];

    if (run === 0) { // straight line up
        for (let y = minY; y <= maxY; y++) {
            linePoints.push({x: x1, y: y});
        }
    } else {
        let m = rise / run; // see below why
        let b = y1 - m * x1; // see below why
        if (m <= 1 && m >= -1) {
            for (let x = minX; x <= maxX; x++) {
                linePoints.push({x: x, y: Math.round(m * x + b)});
            }
        } else {
            for (let y = minY; y <= maxY; y++) {
                linePoints.push({x: Math.round((y - b) / m), y: y});
            }
        }
    }

    return linePoints;
}

/**
 * @source https://www.codeproject.com/Articles/15604/Ray-casting-in-a-2D-tile-based-environment
 */
export function bresenhamLine(point1: Vector2D, point2: Vector2D): Vector2D[] {
    let linePoints: Vector2D[] = [];
    let {x: x1, y: y1 } = point1;
    let {x: x2, y: y2 } = point2;
    let temp: number;
    let steep: boolean = Math.abs(y2 - y1) > Math.abs(x2 - x1);

    if (steep) {
        temp = x1;
        x1 = y1;
        y1 = temp;
    }

    if (x1 > x2) {
        // swap(x1, x2)
        temp = x1;
        x1 = x2;
        x2 = temp;
        
        // swap(y1, y2)
        temp = y1;
        y1 = y2;
        y2 = temp;
    }

    let deltaX: number = x2 - x1;
    let deltaY: number = Math.abs(y2 - y1);
    let error: number = 0;
    let ystep: number;
    let y: number = y1;

    if (y1 < y2) {
        ystep = 1;
    } else {
        ystep = -1;
    }

    for (let x = x1; x <= x2; x++) {
        if (steep) {
            linePoints.push({x: y, y: x});
        } else {
            linePoints.push({x: x, y: y});
        }
        
        error += deltaY;

        if (2 * error >= deltaX) {
            y += ystep;
            error -= deltaX;
        }
    }

    return linePoints;
}

export function Raycast(begin: Vector2D, end: Vector2D, collider: Collider): RaycastResult {
    if (begin.x == end.x && begin.y == end.y) {
        return {
            collided: true,
            where: begin,
            path: [begin],
        }
    }

    let points = bresenhamLine(begin, end);

    for (const point of points) {
        if (collider(point)) {
            return {
                collided: true,
                where: point,
                path: points,
            }
        }
    }

    return {
        collided: false,
        where: null,
        path: points,
    };
}