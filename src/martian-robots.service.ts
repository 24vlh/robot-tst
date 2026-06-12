import { MartianRobot, Orientation } from './martian-robot';
import {Grid, Instruction, Position} from "./martian-robot.interface";

export class MartianRobotsService {
    private readonly scents = new Set<string>();

    run(input: string): string {
        this.scents.clear();

        const lines = input
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

        if (lines.length === 0) {
            return '';
        }

        const grid = this.parseGrid(lines[0]);
        const output: string[] = [];

        for (let index = 1; index < lines.length; index += 2) {
            const robot = this.parseRobot(lines[index]);
            const instructions = lines[index + 1] ?? '';

            this.executeInstructions(robot, instructions, grid);
            output.push(robot.toOutputLine());
        }

        return output.join('\n');
    }

    private parseGrid(line: string): Grid {
        const [maxX, maxY] = line.split(/\s+/).map(Number);

        if (!Number.isInteger(maxX) || !Number.isInteger(maxY)) {
            throw new Error('Invalid grid line');
        }

        return { maxX, maxY };
    }

    private parseRobot(line: string): MartianRobot {
        const [xRaw, yRaw, orientationRaw] = line.split(/\s+/);
        const x = Number(xRaw);
        const y = Number(yRaw);

        if (!Number.isInteger(x) || !Number.isInteger(y)) {
            throw new Error('Invalid robot position');
        }

        if (!this.isOrientation(orientationRaw)) {
            throw new Error('Invalid robot orientation');
        }

        return new MartianRobot(x, y, orientationRaw);
    }

    private executeInstructions(robot: MartianRobot, instructions: string, grid: Grid): void {
        for (const instruction of instructions) {
            if (!this.isInstruction(instruction)) {
                throw new Error(`Unsupported instruction: ${instruction}`);
            }

            this.executeInstruction(robot, instruction, grid);

            if (robot.lost) {
                return;
            }
        }
    }

    private executeInstruction(robot: MartianRobot, instruction: Instruction, grid: Grid): void {
        const handlers: Record<Instruction, () => void> = {
            L: () => robot.turnLeft(),
            R: () => robot.turnRight(),
            F: () => this.moveForward(robot, grid),
        };

        handlers[instruction]();
    }

    private moveForward(robot: MartianRobot, grid: Grid): void {
        const nextPosition = robot.nextForwardPosition();

        if (this.isInsideGrid(nextPosition, grid)) {
            robot.moveTo(nextPosition);
            return;
        }

        const scent = this.getScent(robot);

        if (this.scents.has(scent)) {
            return;
        }

        this.scents.add(scent);
        robot.lost = true;
    }

    private isInsideGrid(position: Position, grid: Grid): boolean {
        return (
            position.x >= 0 &&
            position.x <= grid.maxX &&
            position.y >= 0 &&
            position.y <= grid.maxY
        );
    }

    private getScent(robot: MartianRobot): string {
        return `${robot.x}:${robot.y}:${robot.orientation}`;
    }

    private isOrientation(value: string | undefined): value is Orientation {
        return value === 'N' || value === 'E' || value === 'S' || value === 'W';
    }

    private isInstruction(value: string): value is Instruction {
        return value === 'L' || value === 'R' || value === 'F';
    }
}
