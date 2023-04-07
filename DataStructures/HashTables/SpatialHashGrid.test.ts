import SpatialHashGrid from "./SpatialHashGrid";
import * as fc from "fast-check";
import { map, euclidian } from "../../Algorithms/Math";
import { smallestElement, biggestElement, indexOfBiggest, indexOfSmallest } from "../../Algorithms/Arrays";
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
        fc.assert(fc.property(fc.integer(), fc.array(fc.tuple(fc.integer({min: 0, max: GridSize}), fc.integer({min: 0, max: GridSize}), fc.integer({min: 0, max: ElementSize})), {minLength: 1}), (seed, positions) => {
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

            const Tries = rand.nextInteger(1, positions.length);

            for (let i = 0; i < Tries; i++) {
                let x = rand.nextInteger(0, GridSize);
                let y = rand.nextInteger(0, GridSize);
                let size = rand.nextInteger(10, 100);
                let position = {x: x, y: y};

                let foundClients = grid.findNearby(position, {width: size, height: size});

                let largestDistance = Math.max(dimentions.width, dimentions.height) + size + 1; // distance + a_quadrant_size

                for (const client of foundClients) {
                    expect(euclidian(position, client.position)).toBeLessThanOrEqual(largestDistance);
                }
            }

            for (const client of addedClients) {
                client.position = {x: client.position.x + rand.nextInteger(10, 100), y: client.position.y + rand.nextInteger(10, 100)};
                client.dimention = {width: client.dimention.width + rand.nextInteger(0, 100), height: client.dimention.height + rand.nextInteger(0, 100)};
                grid.UpdateClient(client);
            }


            for (let i = 0; i < Tries; i++) {
                let x = rand.nextInteger(0, GridSize);
                let y = rand.nextInteger(0, GridSize);
                let size = rand.nextInteger(10, 100);
                let position = {x: x, y: y};

                let foundClients = grid.findNearby(position, {width: size, height: size});

                let largestDistance = Math.max(dimentions.width, dimentions.height) + size + 1; // distance + a_quadrant_size

                for (const client of foundClients) {
                    expect(euclidian(position, client.position)).toBeLessThanOrEqual(largestDistance);
                }
            }

            let half = Math.floor(addedClients.length / 2 - 1);

            for (let i = half; i >= 0; i--) {
                let client = addedClients[i];

                grid.RemoveClient(client);

                addedClients.pop();
            }

            for (let i = 0; i < Tries; i++) {
                let x = rand.nextInteger(0, GridSize);
                let y = rand.nextInteger(0, GridSize);
                let size = rand.nextInteger(10, 100);
                let position = {x: x, y: y};

                let foundClients = grid.findNearby(position, {width: size, height: size});

                let largestDistance = Math.max(dimentions.width, dimentions.height) + size + 1; // distance + a_quadrant_size

                for (const client of foundClients) {
                    expect(euclidian(position, client.position)).toBeLessThanOrEqual(largestDistance);
                }
            }
        }));
    });
});
