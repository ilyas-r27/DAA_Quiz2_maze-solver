export interface Cell {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isPath: boolean;
  isCurrent: boolean;
  weight: number;
  distance: number;
  parent: Cell | null;
}

export type AlgorithmType = 'bfs' | 'dfs' | 'dijkstra';

export interface AlgorithmResult {
  visitedOrder: [number, number][];
  path: [number, number][];
  nodesVisited: number;
  pathLength: number;
  executionTime: number;
}

export interface MazeConfig {
  rows: number;
  cols: number;
  speed: number;
  algorithm: AlgorithmType;
}

export interface ComparisonResult {
  algorithm: AlgorithmType;
  result: AlgorithmResult;
}
