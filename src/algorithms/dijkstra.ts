import { Cell, AlgorithmResult } from '@/types';
import { MinHeap } from './minHeap';

export function dijkstra(
  grid: Cell[][],
  start: [number, number],
  end: [number, number]
): AlgorithmResult {
  const startTime = performance.now();
  const rows = grid.length;
  const cols = grid[0].length;

  const dist: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const visited = new Set<string>();
  const parentMap = new Map<string, [number, number]>();
  const visitedOrder: [number, number][] = [];

  const key = (r: number, c: number) => `${r},${c}`;
  const pq = new MinHeap<[number, number]>();

  dist[start[0]][start[1]] = 0;
  pq.push(start, 0);

  const directions: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (pq.size > 0) {
    const [cr, cc] = pq.pop()!;
    const ck = key(cr, cc);

    if (visited.has(ck)) continue;
    visited.add(ck);
    visitedOrder.push([cr, cc]);

    if (cr === end[0] && cc === end[1]) break;

    for (const [dr, dc] of directions) {
      const nr = cr + dr;
      const nc = cc + dc;

      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !grid[nr][nc].isWall &&
        !visited.has(key(nr, nc))
      ) {
        const newDist = dist[cr][cc] + grid[nr][nc].weight;
        if (newDist < dist[nr][nc]) {
          dist[nr][nc] = newDist;
          parentMap.set(key(nr, nc), [cr, cc]);
          pq.push([nr, nc], newDist);
        }
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
