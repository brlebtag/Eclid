export namespace Random {
    export function nextInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    export function nextFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    export function nextValue(): number {
        return Math.random();
    }
}

export namespace Seeded {
    const m = 4294967296;
    const c = 1013904223;
    const a = 1664525;

    let globalSeed = (Math.random() * m) >>> 0;

    export function setSeed(value: number): void {
        globalSeed = value >>> 0;
    }
    
    export function nextValue(): number {
        globalSeed = (a * globalSeed + c) % m;
        return globalSeed / m;
    }

    export function nextInteger(min: number, max: number): number {
        return Math.floor(nextValue() * (max - min)) + min;
    }
    
    export function nextFloat(min: number, max: number): number {
        return nextValue() * (max - min) + min;
    }

    export class Random {
        private seed: number;

        constructor(s: number) {
            this.seed = s >>> 0;
        }

        public nextValue(): number {
            this.seed = (a * this.seed + c) % m;
            return this.seed / m;     
        }

        public nextInteger(min: number, max: number): number {
            return Math.floor(this.nextValue() * (max - min)) + min;
        }
        
        public nextFloat(min: number, max: number): number {
            return this.nextValue() * (max - min) + min;
        }
    }
}
