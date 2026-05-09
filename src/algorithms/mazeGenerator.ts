import { Cell } from '@/types';

export function generateMaze(rows: number, cols: number): Cell[][] {
  const r = rows % 2 === 0 ? rows + 1 : rows;
  const c = cols % 2 === 0 ? cols + 1 : cols;

  // Initialize grid: all walls
  const grid: Cell[][] = Array.from({ length: r }, (_, row) =>
    Array.from({ length: c }, (_, col) => ({
      row,
      col,
      isWall: true,
      isStart: false,
      isEnd: false,
      isVisited: false,
      isPath: false,
      isCurrent: false,
      weight: 1,
      distance: Infinity,
      parent: null,
    }))
  );

  const directions: [number, number][] = [
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ];

  function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function carve(row: number, col: number) {
    grid[row][col].isWall = false;
    const shuffled = shuffle([...directions]);

    for (const [dr, dc] of shuffled) {
      const nr = row + dr;
      const nc = col + dc;

      if (nr > 0 && nr < r && nc > 0 && nc < c && grid[nr][nc].isWall) {
        grid[row + dr / 2][col + dc / 2].isWall = false;
        carve(nr, nc);
      }
    }
  }

  carve(1, 1);

  // Set default start and end
  grid[1][1].isStart = true;
  grid[r - 2][c - 2].isEnd = true;

  return grid;
}
