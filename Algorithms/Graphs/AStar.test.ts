import * as fc from 'fast-check';
import aStar, { Node } from './AStar';
import { key, ascending, Vector2D } from '../../Common';
import { positionToVector2D } from '../Arrays';
import { octile } from '../Math';
import { dictionary } from '../Dictionaries';
import BinaryHeap from '../../DataStructures/Heaps/BinaryHeap';

const GridSize = 200;

function getNode(collection: Record<string, Node>, x: number, y: number): Node {
    let key = `${x}#${y}`
    if (collection[key]) {
        return collection[key];
    } else {
        collection[key] = {
            x: x,
            y: y,
            g: Number.MAX_SAFE_INTEGER,
            f: Number.MAX_SAFE_INTEGER,
            h: Number.MAX_SAFE_INTEGER,
            visited: false
        };

        return collection[key];
    }
}

describe('aStar()', () => {
    it('must find, if exists, a valid path from a to b', () => {
        fc.assert(fc.property(fc.uniqueArray(fc.integer({min: 0, max: GridSize * GridSize - 1}), {minLength: 2}), collisions => {
            let source = positionToVector2D(Math.min(collisions[0], collisions[1]), GridSize) as Node;
            let destiny = positionToVector2D(Math.max(collisions[0], collisions[1]), GridSize) as Node;

            source.g = source.h = source.f = 0;
            source.visited = true;
            source.previous = null;
            collisions.splice(0, 2);

            let nodes = {
                [key(source)]: source,
                [key(destiny)]: destiny,
            };

            let collide = dictionary(collisions, (e: number) => e);

            let state = { 
                source: source as Node,
                destiny: destiny as Node,
                closedSet: {},
                openedSet: new BinaryHeap<Node>((n1, n2) => {
                    return ascending(n1.f, n2.f);
                }, [source as Node]),
                g: (n, _) => (n.g + 1),
                f: (n, _) => (n.g + n.h),
                h: (n, d) => octile(n, d),
                neighbors: (n, neighbors) => {
                    if (n.x - 1 >= 0) {
                        neighbors.push(getNode(nodes, n.x - 1, n.y));
            
                        if (n.y - 1 >= 0) {
                            neighbors.push(getNode(nodes, n.x - 1, n.y - 1));
                        }
                    }
            
                    if (n.x + 1 <= GridSize) {
                        neighbors.push(getNode(nodes, n.x + 1, n.y));
            
                        if (n.y + 1 <= GridSize) {
                            neighbors.push(getNode(nodes, n.x + 1, n.y + 1));
                        }
                    }
            
                    if (n.y - 1 >= 0) {
                        neighbors.push(getNode(nodes, n.x, n.y - 1));
            
                        if (n.x + 1 <= GridSize) {
                            neighbors.push(getNode(nodes, n.x + 1, n.y - 1));
                        }
                    }
            
                    if (n.y + 1 <= GridSize) {
                        neighbors.push(getNode(nodes, n.x, n.y + 1));
            
                        if (n.x - 1 >= 0) {
                            neighbors.push(getNode(nodes, n.x - 1, n.y + 1));
                        }
                    }
                },
                collider: n => collide[n.y * GridSize + n.x] !== undefined,
            };;

            let path = aStar(state);

            if (path.length > 0) {

                // Check Path is valid.
                let last = path[path.length - 1];


                expect(last.x).toBe(source.x);
                expect(last.y).toBe(source.y);

                expect(path[0].x).toBe(destiny.x);
                expect(path[0].y).toBe(destiny.y);

                for (let index = path.length - 2; index >= 0; index--) {
                    const current = path[index];

                    let diffX = Math.abs(last.x - current.x);
                    let diffY = Math.abs(last.y - current.y);

                    expect(diffX).toBeGreaterThanOrEqual(0);
                    expect(diffX).toBeLessThanOrEqual(1);

                    expect(diffY).toBeGreaterThanOrEqual(0);
                    expect(diffY).toBeLessThanOrEqual(1);

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
