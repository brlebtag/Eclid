import SpatialHashGrid from "./SpatialHashGrid";
import * as fc from "fast-check";
import { map, euclidian } from "../../Algorithms/Math";
import { smallestElement, biggestElement } from "../../Algorithms/Arrays";
import { Seeded } from "../../Algorithms/Random";

function compareMin(tupleA: [number, number, number], tupleB: [number, number, number]): number{
    const [xA , yA] = tupleA;
    const [xB , yB] = tupleB;

    return Math.min(xA, yA) - Math.min(xB, yB);
}

function compareMax(tupleA: [number, number, number], tupleB: [number, number, number]): number{ 
    const [xA , yA] = tupleA;
    const [xB , yB] = tupleB;

    return Math.max(xA, yA) - Math.max(xB, yB);
}

const GridSize = 1_000;
const ElementSize = 100;

describe('SpatialHashGrid', () => {
    it('must insert, update and search data preceisely', () => {
        fc.assert(fc.property(fc.integer(), fc.array(fc.tuple(fc.integer({min: 0, max: GridSize}), fc.integer({min: 0, max: GridSize}), fc.integer({min: 0, max: ElementSize}))), (seed, positions) => {
            let rand = new Seeded.Random(seed);

            let bounds = {
                beginX: 0,
                beginY: 0,
                endX: GridSize,
                endY: GridSize,
            };

            let quadrantSize = 50;

            let dimentions = {
                width: (bounds.endX - bounds.beginX) / quadrantSize,
                height: (bounds.endY - bounds.beginY) / quadrantSize,
            };

            let grid = new SpatialHashGrid(bounds, dimentions);

            let minEl = smallestElement(positions, compareMin);
            let maxEl = biggestElement(positions, compareMax);

            let min = Math.min(minEl[0], minEl[1]);
            let max = Math.max(maxEl[0], maxEl[1]);
            let addedClients = [];

            for (const tuple of positions) {
                const [x, y, size] = tuple;
                const position = {x: map(x, min, max, 0, GridSize), y: map(y, min, max, 0, GridSize)};
                const dimention = {width: size, height: size};
                addedClients.push(grid.newClient(position, dimention));
            }

            let result = true;

            for (let i = 0; i < positions.length; i++) {
                let x = rand.nextInteger(0, GridSize);
                let y = rand.nextInteger(0, GridSize);
                let size = rand.nextInteger(10, 100);
                let position = {x: x, y: y};

                let foundClients = grid.findNearby(position, {width: size, height: size});

                let largestDistance = Math.max(dimentions.width, dimentions.height) + size; // distance + a_quadrant_size

                for (const client of foundClients) {
                    result &&= euclidian(position, client.position) <= largestDistance;
                }
            }

            expect(result).toBe(true);

            for (const client of addedClients) {
                client.position = {x: client.position.x + 30, y: client.position.y + 30};
                grid.UpdateClient(client);
            }

            result = true;

            for (let i = 0; i < positions.length; i++) {
                let x = rand.nextInteger(0, GridSize);
                let y = rand.nextInteger(0, GridSize);
                let size = rand.nextInteger(10, 100);
                let position = {x: x, y: y};

                let foundClients = grid.findNearby(position, {width: size, height: size});

                let largestDistance = Math.max(dimentions.width, dimentions.height) + size; // distance + a_quadrant_size

                for (const client of foundClients) {
                    result &&= euclidian(position, client.position) <= largestDistance;
                }
            }

            expect(result).toBe(true);

            let half = Math.floor(addedClients.length / 2 - 1);

            for (let i = half; i >= 0; i--) {
                let client = addedClients[i];

                grid.RemoveClient(client);

                addedClients.pop();
            }

            result = true;

            for (let i = 0; i < half; i++) {
                let x = rand.nextInteger(0, GridSize);
                let y = rand.nextInteger(0, GridSize);
                let size = rand.nextInteger(10, 100);
                let position = {x: x, y: y};

                let foundClients = grid.findNearby(position, {width: size, height: size});

                let largestDistance = Math.max(dimentions.width, dimentions.height) + size; // distance + a_quadrant_size

                for (const client of foundClients) {
                    result &&= euclidian(position, client.position) <= largestDistance;
                }
            }

            expect(result).toBe(true);
        }));
    });
});