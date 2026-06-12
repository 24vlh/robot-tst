import { describe, expect, it } from 'vitest';
import { MartianRobotsService } from './martian-robots.service';

describe('MartianRobotsService', () => {
    it('matches the sample output', () => {
        const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

        const output = new MartianRobotsService().run(input);

        expect(output).toBe(`1 1 E
3 3 N LOST
2 3 S`);
    });

    it('marks a robot as lost when it moves outside the grid', () => {
        const input = `5 3
3 3 N
F`;

        const output = new MartianRobotsService().run(input);

        expect(output).toBe('3 3 N LOST');
    });

    it('uses a scent to ignore a repeated fatal move from the same position and direction', () => {
        const input = `5 3
3 3 N
F
3 3 N
F`;

        const output = new MartianRobotsService().run(input);

        expect(output).toBe(`3 3 N LOST
3 3 N`);
    });

    it('does not apply a scent to a different direction from the same position', () => {
        const input = `5 3
3 3 N
F
3 3 E
F`;

        const output = new MartianRobotsService().run(input);

        expect(output).toBe(`3 3 N LOST
4 3 E`);
    });

    it('turns and moves a robot without losing it', () => {
        const input = `5 3
1 1 E
RFRFRFRF`;

        const output = new MartianRobotsService().run(input);

        expect(output).toBe('1 1 E');
    });

    it('throws for unsupported instructions', () => {
        const input = `5 3
1 1 E
X`;

        expect(() => new MartianRobotsService().run(input)).toThrow('Unsupported instruction');
    });
});
