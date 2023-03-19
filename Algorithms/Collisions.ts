import { Circle, Rectangle, Vector2D } from "../Common";
import { euclidian } from './Math';

export function AABBTest(a: Rectangle, b: Rectangle): boolean {
    return a.x < b.x + b.width
        && a.x + a.width > a.x
        && a.y < b.y + b.height
        && a.y + a.height > b.y;
}

export function PointWithinRectangle(point: Vector2D, rect: Rectangle) {
    return point.x >= rect.x && point.x <= rect.x + rect.width
    && point.y >= rect.y && point.y <= rect.y + rect.height;
}

export function PointWithinCircle(point: Vector2D, circle: Circle) {
    return euclidian(point, circle) <= circle.radius;
}