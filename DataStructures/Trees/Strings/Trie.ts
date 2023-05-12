export interface Node<T> {
    children: Record<string, Node<T>>;
    parent: Node<T>;
    key: string;
    item: T;
    terminal: boolean;
}

function makeNode<T>(key: string, item: T): Node<T> {
    return {
        children: {},
        item: item,
        terminal: false,
        key: key,
    } as Node<T>;
}

export class Trie<T> {
    private root: Node<T>;

    constructor() {
        this.root = makeNode('', null);
        this.root.terminal = true;
    }

    add(key: string, item: T = null): this {
        let node: Node<T> = this.root;
        for (const ch of key) {
            if (!node.children[ch]) {
                let newNode = makeNode(ch, null);
                node.children[ch] = newNode;
                node = newNode;
            } else {
                node = node.children[ch];
            }
        }
        node.item = item;
        node.terminal = true;
        return this;
    }
    
    remove(key: string): T {
        let node: Node<T> = this.root;
        let nodes: Node<T>[] = [];

        for (const ch of key) {
            if (!node.children[ch]) return null; // not found ...
            nodes.push(node);
            node = node.children[ch];
        }

        let item = null;

        if (Object.keys(node.children).length > 0) {
            node.terminal = false;
            item = node.item;
        } else {
            let key = node.key;
            item = node.item;
            
            while(nodes.length > 0) {
                node = nodes.pop();
                delete node.children[key];
                key = node.key;
                if (node.terminal) break;
            }
        }

        return item;
    }
}
