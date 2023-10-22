// generate a random integer
export function randomInt(incMin: number, incMax: number) : number {
    return Math.floor(Math.random() * (incMax - incMin + 1) ) + incMin;
}

// produce a random smaller array from a large one
export function randomSelection<T>(haystack: Array<T>, min: number, max: number) : Array<T> {
    const result : Array<T> = [];
    const nNeedles = randomInt(min, max);
    for (let n=0; n<nNeedles; ++n) {
        const randomSelection = haystack[randomInt(0, haystack.length-1)];
        result.push(randomSelection);
    }
    const noDuplicates = [...new Set(result)];
    return noDuplicates;
}

// generate N-types of a T object with weighted probability for each type
export type WeightedObjectGeneratorFunction<T> = ()=>T;
export type WeightedObjectGeneratorSpec<T> = {
    name: string,
    fnc: WeightedObjectGeneratorFunction<T>,
    weight: number
};
export class WeightedObjectGenerator<T> {
    readonly genaratorDeck : WeightedObjectGeneratorFunction<T>[] = [];
    constructor(...genarators: WeightedObjectGeneratorSpec<T>[]) {
        genarators.forEach((g)=>{
            for (let i=0; i<g.weight; i++) {
                this.genaratorDeck.push(g.fnc);
            }
        })
    }
    generate() : T {
        const i = randomInt(0, this.genaratorDeck.length-1);
        const fnc = this.genaratorDeck[i];
        return fnc();
    }
}
