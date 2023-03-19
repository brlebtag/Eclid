import * as fc from 'fast-check';
import { bresenhamLine } from './Raycasting';

describe('bresenhamLine', () => {
    it('must return a path that increases relatively from begin to end and these two points must be in the returned list', () => {
        fc.assert(fc.property(
            fc.integer({min: -1000, max: 1000}),
            fc.integer({min: -1000, max: 1000}),
            fc.integer({min: -1000, max: 1000}),
            fc.integer({min: -1000, max: 1000}),
            (x1, y1, x2, y2)=> {
                let point1 = {x: x1, y: y1};
                let point2 = {x: x2, y: y2};
                let points = bresenhamLine(point1, point2);
                let len = points.length - 1;

                let deltaX = x2 - x1; // who is bigger?
                let deltaY = y2 - y1; // who is bigger?

                let prevPoint = points[0];
                expect(points[0].x).toBe(x1);
                expect(points[0].y).toBe(y1);
                expect(points[len].x).toBe(x2);
                expect(points[len].y).toBe(y2);

                let result = true;

                for (let i = 1; i <= len; i++) {
                    if (!result) break;
                    const point = points[i];
                    result &&= deltaX < 0 ? prevPoint.x >= point.x : point.x >= prevPoint.x;
                    result &&= deltaY < 0 ? prevPoint.y >= point.y : point.y >= prevPoint.y;
                    prevPoint = point;
                }

                expect(result).toBe(result);
            })
        );
    });
});