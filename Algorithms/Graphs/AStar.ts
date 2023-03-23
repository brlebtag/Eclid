import { Vector2D } from "../../Common";
import IHeap from '../../DataStructures/Heaps/IHeap';

interface G {
    (source: Node, destiny: Node): number;
}

interface F {
    (source: Node, destiny: Node): number;
}

interface H {
    (source: Node, destiny: Node): number;
}

interface Node extends Vector2D {
    g?: number;
    f?: number;
    previous?: Node;
}

interface Neighbors {
    (node: Node, neighbors: Node[]): void;
}

interface State {
    source: Node;
    destiny: Node;
    closedSet: Record<string, Node>;
    openSet: IHeap<Node>;
    g: G;
    f: F;
    h: H;
    neighbors: Neighbors;
    obstacle: Obstacle;
}

interface Obstacle {
    (node: Node): boolean;
}

function key(v: Node): string {
    return `${v.x}#${v.y}`;
}

export default function aStar(state: State): Node[] {
    const { source, destiny, closedSet, openSet, g, f, h, neighbors, obstacle} = state;

    let destinyKey = key(destiny);

    let neighborNodes = [];
    let node;
    let nodeKey;

    while (!openSet.empty()) {
        node = openSet.pop();
        nodeKey = key(node);

        if (nodeKey == destinyKey) {
            break;
        }

        const tempG = g(node.g, destiny);

        neighbors(node, neighborNodes);

        for (const neighbor of neighborNodes) {
            let neighborKey = key(neighbor);

            if (!closedSet[neighborKey] && !obstacle(neighbor)) {
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
                    neighbor.h = h(neighbor, destiny);
                    neighbor.f = f(neighbor, destiny);
                    neighbor.previous = node;
                }
            }
        }

        neighborNodes.length = 0;
    }

    let path = [];

    let sourceKey = key(source);

    if (nodeKey === destinyKey) {
        
        while(nodeKey != sourceKey) {
            path.push(node);
            node = node.previous;
            nodeKey = key(node);
        }
    }

    return path;
}
