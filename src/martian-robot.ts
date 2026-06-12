import {forwardMoves, leftTurns, rightTurns} from "./martian-robot.const";
import {Position} from "./martian-robot.interface";

export type Orientation = 'N' | 'E' | 'S' | 'W';

export class MartianRobot {
    public lost = false;

    constructor(
        public x: number,
        public y: number,
        public orientation: Orientation,
    ) {}

    turnLeft(): void {
        this.orientation = leftTurns[this.orientation];
    }

    turnRight(): void {
        this.orientation = rightTurns[this.orientation];
    }

    nextForwardPosition(): Position {
        const move = forwardMoves[this.orientation];

        return {
            x: this.x + move.x,
            y: this.y + move.y,
        };
    }

    moveTo(position: Position): void {
        this.x = position.x;
        this.y = position.y;
    }

    toOutputLine(): string {
        return `${this.x} ${this.y} ${this.orientation}${this.lost ? ' LOST' : ''}`;
    }
}
