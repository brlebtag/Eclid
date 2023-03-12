import { Comparator } from "../Common";

// https://dev.to/mokkapps/property-based-testing-with-typescript-2ljj
// https://stackoverflow.com/questions/21624268/difference-between-stdmerge-and-stdinplace-merge
// https://semaphoreci.com/blog/property-based-testing-python-hypothesis-pytest

export function smallestMidpoint(begin: number, end:number): number {
    return ((begin^end)>>1) + (begin&end);
}

export function biggestMidpoint(begin: number, end:number): number {
    return (begin|end) - ((begin^end)>>1); 
}

export function lowerBound<T>(elements: T[], value: T, cmp: Comparator<T>, args: number[] = []): number {
    let begin: number = 0, end:number = elements.length; // [begin, end)

    if (args.length > 0) {
        begin = args[0];
    }
    
    if (args.length > 1) {
        end = args[1]; // exclusive
    }

    let count = end - begin;

    while(count > 0) {
        let step = Math.floor(count / 2);
        let index = begin + step;

        if (cmp(elements[index], value) < 0) {
            begin = ++index;
            count -= step+1;
        }
        else
        {
            count = step;
        }
    }

    return begin;
}

export function upperBound<T>(elements: T[], value: T, cmp: Comparator<T>, args: number[] = []): number {
    let begin: number = 0, end:number = elements.length; // [begin, end)

    if (args.length > 0) {
        begin = args[0];
    }
    
    if (args.length > 1) {
        end = args[1]; // exclusive
    }

    let count = end - begin;

    while(count > 0) {
        let step = Math.floor(count / 2);
        let index = begin + step;

        if (cmp(value, elements[index]) >= 0) {
            begin = ++index;
            count -= step+1;
        }
        else
        {
            count = step;
        }
    }

    return begin;
}

export function binarySearch<T>(elements: T[], value: T, cmp: Comparator<T>, args: number[] = []): boolean {
    let begin: number = 0, end:number = elements.length; // [begin, end)

    if (args.length > 0) {
        begin = args[0];
    }
    
    if (args.length > 1) {
        end = args[1]; // exclusive
    }

    begin = lowerBound(elements, value, cmp, args);

    return (begin != end && cmp(elements[begin], value) == 0);
}

export function indexOfSmallest<T>(elements: T[], cmp: Comparator<T>, args: number[] = []): number {
    if (elements.length == 0) return -1;

    let begin: number = 0, end:number = elements.length; // [begin, end)

    if (args.length > 0) {
        begin = args[0];
    }
    
    if (args.length > 1) {
        end = args[1]; // exclusive
    }

    if (begin == end) return -1;

    let smallest: number = begin;

    while(++begin != end) {
        if (cmp(elements[begin], elements[smallest]) < 0) {
            smallest = begin;
        }
    }

    return begin;
}

export function smallestElement<T>(elements: T[], cmp: Comparator<T>, args: number[] = []): T {
    let index = indexOfSmallest(elements, cmp, args);
    if (index == -1) return null;
    return elements[index];
}

export function indexOfBiggest<T>(elements: T[], cmp: Comparator<T>, args: number[] = []): number {
    if (elements.length == 0) return -1;

    let begin: number = 0, end:number = elements.length; // [begin, end)

    if (args.length > 0) {
        begin = args[0];
    }
    
    if (args.length > 1) {
        end = args[1]; // exclusive
    }

    if (begin == end) return -1;

    let largest: number = begin;

    while(++begin != end) {
        if (cmp(elements[begin], elements[largest]) > 0) {
            largest = begin;
        }
    }

    return begin;
}

export function biggestElement<T>(elements: T[], cmp: Comparator<T>, args: number[] = []): T {
    let index = indexOfBiggest(elements, cmp, args);
    if (index == -1) return null;
    return elements[index];
}

/**
 * [begin1, end1)
 */
export function copy<T>(source: T[], begin1: number, end1: number, dest: T[], begin2: number): T[] {
    for (; begin1 < end1; begin1++, begin2++) {
        dest[begin2] = source[begin1];        
    }
    return dest;
}

export function merge<T>(list1: T[], list2: T[], dest: T[], cmp: Comparator<T>, args: number[] = []): T[] {
    let begin1: number = 0, end1: number = list1.length;
    let begin2: number = 0, end2: number = list2.length;

    if (args.length > 0) {
        begin1 = args[0];
    }
    
    if (args.length > 1) {
        end1 = args[1]; // exclusive
    }

    if (args.length > 2) {
        begin2 = args[2];
    }
    
    if (args.length > 3) {
        end2 = args[3]; // exclusive
    }

    while (true) {
        if (begin1 == end1) return copy(list2, begin2, end2, dest, dest.length);
        if (begin2 == end2) return copy(list1, begin1, end1, dest, dest.length);
        dest.push(cmp(list1[begin1], list2[begin2]) < 0 ? list1[begin1++] : list2[begin2++]);
    }
}

export function shiftIndex(index: number, size: number): number {
    if (index >= 0) return index % size; // shift to right
    let newIndex = size - (Math.abs(index) % size); // shift to left
    return newIndex == size ? 0 : newIndex;
}

export function parentNodeIndex(index: number): number{
    return Math.ceil(index / 2.0) - 1;
}

export function leftNodeIndex(index: number): number {
    return 2 * index + 1;
}

export function rightNodeIndex(index: number): number {
    return 2 * index + 2;
}

export function swap<T>(data: T[], i: number, j: number): void{
    let temp: T = data[j];
    data[j] = data[i];
    data[i] = temp;
}