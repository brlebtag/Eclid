import { Vector2D, key } from "../../Common";
import IHeap from '../../DataStructures/Heaps/IHeap';

export interface Measurement {
    (source: Node, destiny: Node): number;
}

export interface Node extends Vector2D {
    g?: number;
    f?: number;
    h?: number;
    previous?: Node;
    visited?: boolean;
}

export interface Neighbors {
    (node: Node, neighbors: Node[]): void;
}

export interface State {
    source: Node;
    destiny: Node;
    openedSet: IHeap<Node>;
    closedSet: Record<string, Node>;
    g: Measurement;
    f: Measurement;
    h: Measurement;
    neighbors: Neighbors;
}

export default function aStar(state: State): Node[] {
    const { source, destiny, closedSet, openedSet, g, f, h, neighbors } = state;
    let _neighbors = [];
    let node = source;

    while (!openedSet.empty()) {
        node = openedSet.pop();

        if (node.x == destiny.x && node.y == destiny.y) break;

        let nodeKey = key(node);

        closedSet[nodeKey] = node; // mark as visited        

        neighbors(node, _neighbors); // Get Neighbors of node

        for (const neighbor of _neighbors) {

            const cost = g(node, neighbor);

            if (neighbor.visited) {
                if (cost < (neighbor.g || Number.MAX_SAFE_INTEGER)) {
                    neighbor.g = cost;
                    neighbor.previous = node; // this node is the best path
                    openedSet.update(neighbor); // O(N + Lg N)
                }
            } else {
                neighbor.g = cost;
                neighbor.h = h(neighbor, destiny);
                neighbor.f = f(neighbor, destiny);
                neighbor.previous = node;
                neighbor.visited = true;
                openedSet.push(neighbor);
            }
        }

        _neighbors.length = 0; // clean neighbors
    }

    let path = [];

    if (node.x === destiny.x && node.y == destiny.y) {
        while(!(node.x == source.x && node.y == source.y)) {
            path.push(node);
            node = node.previous;
        }

        path.push(node); // source...
    }

    return path;
}
