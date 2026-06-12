# Martian Robots

Small TypeScript / Node.js solution for the Martian Robots programming problem.

The program reads a grid, robot starting positions, and instruction strings. It then prints the final position of each robot. If a robot moves off the grid for the first time from a position/direction, it is reported as `LOST`. That position/direction is then recorded as a scent so future robots ignore the same fatal move.

## Architecture Note

The challenge rule says that the first robot to move off the grid is `LOST`, and that the last valid position/direction leaves a scent for future robots.

That is a valid rule, but it is not how a safety-oriented robot controller would normally be designed.

Because the controller knows the grid boundary, a real system would normally calculate the proposed next position before executing movement. If the next position is outside the permitted area, the controller would reject the move and report something like `UNSAFE_MOVE_REJECTED` or `WOULD_BE_LOST_IF_PROCEEDED`.

For this implementation, the challenge semantics are followed exactly:

- first fatal move from a position/direction => robot is `LOST`
- later identical fatal move => instruction is ignored because of scent

## Requirements

- Node.js 20+
- pnpm

## Install

```bash
pnpm install
```

## Run tests

```bash
pnpm test
```

## Run with the sample input

```bash
pnpm run start:sample
```

Expected output:

```text
1 1 E
3 3 N LOST
2 3 S
```

## Run with another input file

```bash
pnpm start -- path/to/input.txt
```

## Run using stdin

```bash
pnpm start < sample-input.txt
```

## Approach

The solution is deliberately small.

- `src/martian-robot.ts` contains the robot state and movement rules.
- `src/martian-robots.service.ts` parses input, executes robot instructions, tracks scents, and formats output.
- `src/index.ts` is only the Node.js entry point. It reads input and prints output.
- `src/martian-robots.service.spec.ts` contains tests.

A scent is stored as `x:y:orientation`, because the warning only applies to the same forward move from the same position while facing the same direction.

The implementation follows the challenge semantics. In a real robot-control system, the controller would normally reject unsafe moves before the robot left the known boundary. Here, the `LOST` behaviour is implemented because it is part of the problem statement.
