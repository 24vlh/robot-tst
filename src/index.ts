import { readFileSync } from 'node:fs';
import { MartianRobotsService } from './martian-robots.service';

function readInput(): string {
    const inputFilePath = process.argv[2];

    if (inputFilePath) {
        return readFileSync(inputFilePath, 'utf8');
    }

    return readFileSync(0, 'utf8');
}

const input = readInput();
const output = new MartianRobotsService().run(input);

process.stdout.write(output);

if (output.length > 0) {
    process.stdout.write('\n');
}
