export interface Position {
    x: number;
    y: number;
}

export type Instruction = 'L' | 'R' | 'F';

export  interface Grid {
    maxX: number;
    maxY: number;
}
