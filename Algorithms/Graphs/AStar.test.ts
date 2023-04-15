import * as fc from 'fast-check';
import aStar, { Node } from './AStar';
import { key, Vector2D, ascending } from '../../Common';
import { positionToVector2D } from '../Arrays';
import { octile } from '../Math';
import { dictionary } from '../Dictionaries';
import BinaryHeap from '../../DataStructures/Heaps/BinaryHeap';

const GridSize = 200;

describe('aStar()', () => {
    it('must find, if exists, a valid path from a to b', () => {
        fc.assert(fc.property(fc.uniqueArray(fc.integer({min: 0, max: GridSize * GridSize - 1}), {minLength: 2}), collisions => {
            let source = positionToVector2D(Math.min(collisions[0], collisions[1]), GridSize);
            let destiny = positionToVector2D(Math.max(collisions[0], collisions[1]), GridSize);

            console.log(collisions);

            collisions.splice(0, 2);

            let collide = dictionary(collisions, e => e);

            let state = { 
                source: source,
                destiny: destiny,
                closedSet: {
                    [key(source)]: source
                },
                openSet: new BinaryHeap<Node>((n1, n2) => ascending(n1.f, n2.f), [source]),
                g: n => n.g + 1,
                f: n => n.g + n.h,
                h: n => octile(n, destiny),
                neighbors: (n, neighbors) => {
                    if (n.x - 1 >= 0) {
                        neighbors.push({x: n.x - 1, y: n.y});

                        if (n.y - 1 >= 0) {
                            neighbors.push({x: n.x - 1, y: n.y - 1});
                        }
                    }

                    if (n.x + 1 <= GridSize) {
                        neighbors.push({x: n.x + 1, y: n.y});

                        if (n.y + 1 <= GridSize) {
                            neighbors.push({x: n.x + 1, y: n.y + 1});
                        }
                    }

                    if (n.y - 1 >= 0) {
                        neighbors.push({x: n.x, y: n.y - 1});

                        if (n.x + 1 <= GridSize) {
                            neighbors.push({x: n.x + 1, y: n.y - 1});
                        }
                    }

                    if (n.y + 1 <= GridSize) {
                        neighbors.push({x: n.x, y: n.y + 1});

                        if (n.x - 1 >= 0) {
                            neighbors.push({x: n.x - 1, y: n.y + 1});
                        }
                    }
                },
                collider: n => collide[n.y * GridSize + n.x] !== undefined,
            };

            let path = aStar(state);

            if (path.length > 0) {

                // Check Path is valid.
                let last = path[path.length - 1];

                expect(path[0].x).toBe(source.x);
                expect(path[0].y).toBe(source.y);

                expect(last.x).toBe(destiny.x);
                expect(last.y).toBe(destiny.y);

                for (let index = path.length - 2; index >= 0; index--) {
                    const current = path[index];
                    expect(last.x).toBeGreaterThanOrEqual(current.x);
                    expect(last.y).toBeGreaterThanOrEqual(current.y);
                    last = current;
                }
            } else {
                // Check if there is no path ...
                let grid =  [...Array(GridSize)].map(_ => [...Array(GridSize)].map(_ => (0)));

                for (const collision of collisions) {
                    let position = positionToVector2D(collision, GridSize);
                    grid[position.y][position.x] = -1;
                }

                let neighbors = [];
                let pos = {x: 0, y: 0};
                let breakall = false;

                for (let y = source.y; y < GridSize; y++) {
                    for (let x = 0; x < GridSize; x++) {
                        
                        if (grid[pos.y][pos.x] == -1) continue;

                        if (destiny.x == x && destiny.y == y) {
                            breakall = true;
                            break;
                        }

                        pos.x = x;
                        pos.y = y;
                        state.neighbors(pos, neighbors);

                        for (const neighbor of neighbors) {
                            if (grid[neighbor.y][neighbor.x] >= 0) {
                                grid[neighbor.y][neighbor.x] += grid[pos.y][pos.x] + 1;
                            }
                        }

                        neighbors.length = 0;
                    }

                    if (breakall) {
                        break;
                    }
                }

                expect(grid[destiny.y][destiny.x]).toBe(0);
            }
        }));
    });
});
