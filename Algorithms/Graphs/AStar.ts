import { Vector2D, Collider, key } from "../../Common";
import IHeap from '../../DataStructures/Heaps/IHeap';

export interface Measurement {
    (source: Node): number;
}

export interface Node extends Vector2D {
    g?: number;
    f?: number;
    h?: number;
    previous?: Node;
}

export interface Neighbors {
    (node: Node, neighbors: Node[]): void;
}

export interface State {
    source: Node;
    destiny: Node;
    closedSet: Record<string, Node>;
    openSet: IHeap<Node>;
    g: Measurement;
    f: Measurement;
    h: Measurement;
    neighbors: Neighbors;
    collider: Collider;
}

export default function aStar(state: State): Node[] {
    const { source, destiny, closedSet, openSet, g, f, h, neighbors, collider} = state;
    let neighborNodes = [];
    let node = source;

    while (!openSet.empty()) {
        node = openSet.pop();

        if (node.x == destiny.x && node.y == destiny.y) break;

        const tempG = g(node);

        neighbors(node, neighborNodes);

        for (const neighbor of neighborNodes) {
            let neighborKey = key(neighbor);

            if (!closedSet[neighborKey] && !collider(neighbor)) {
                let newPath = false;

                if (openSet[neighborKey]) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet[neighborKey] = neighbor;
                    newPath = true;
                }

                if (newPath) {
                    neighbor.h = h(neighbor);
                    neighbor.f = f(neighbor);
                    neighbor.previous = node;
                }
            }
        }

        neighborNodes.length = 0;
    }

    let path = [];

    if (node.x === destiny.x && node.y == destiny.y) {
        while(!(node.x == source.x && node.y == source.y)) {
            path.push(node);
            node = node.previous;
        }
    }

    return path;
}
