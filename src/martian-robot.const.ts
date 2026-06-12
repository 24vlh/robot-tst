import {Orientation} from "./martian-robot";
import {Position} from "./martian-robot.interface";

export const leftTurns: Record<Orientation, Orientation> = {
    N: 'W',
    W: 'S',
    S: 'E',
    E: 'N',
};

export const rightTurns: Record<Orientation, Orientation> = {
    N: 'E',
    E: 'S',
    S: 'W',
    W: 'N',
};

export const forwardMoves: Record<Orientation, Position> = {
    N: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    S: { x: 0, y: -1 },
    W: { x: -1, y: 0 },
};
