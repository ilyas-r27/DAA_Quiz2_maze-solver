import { Cell, AlgorithmResult } from '@/types';

export function bfs(
  grid: Cell[][],
  start: [number, number],
  end: [number, number]
): AlgorithmResult {
  const startTime = performance.now();
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  const parentMap = new Map<string, [number, number]>();
  const queue: [number, number][] = [start];
  const visitedOrder: [number, number][] = [];

  const key = (r: number, c: number) => `${r},${c}`;
  visited.add(key(start[0], start[1]));

  const directions: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [cr, cc] = queue.shift()!;
    visitedOrder.push([cr, cc]);

    if (cr === end[0] && cc === end[1]) break;

    for (const [dr, dc] of directions) {
      const nr = cr + dr;
      const nc = cc + dc;
      const nk = key(nr, nc);

      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !grid[nr][nc].isWall &&
        !visited.has(nk)
      ) {
        visited.add(nk);
        parentMap.set(nk, [cr, cc]);
        queue.push([nr, nc]);
      }
    }
  }

  // Reconstruct path
  const path: [number, number][] = [];
  let current: [number, number] | undefined = end;
  while (current && key(current[0], current[1]) !== key(start[0], start[1])) {
    path.unshift(current);
    current = parentMap.get(key(current[0], current[1]));
  }
  if (current) path.unshift(start);

  const endTime = performance.now();
  return {
    visitedOrder,
    path,
    nodesVisited: visitedOrder.length,
    pathLength: path.length,
    executionTime: endTime - startTime,
  };
}
