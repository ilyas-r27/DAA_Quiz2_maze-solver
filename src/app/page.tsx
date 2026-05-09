'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import MazeGrid from '@/components/MazeGrid';
import Controls from '@/components/Controls';
import MetricsPanel from '@/components/MetricsPanel';
import ComparisonTable from '@/components/ComparisonTable';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateMaze } from '@/algorithms/mazeGenerator';
import { bfs } from '@/algorithms/bfs';
import { dfs } from '@/algorithms/dfs';
import { dijkstra } from '@/algorithms/dijkstra';
import { AlgorithmType, AlgorithmResult, ComparisonResult, Cell } from '@/types';
import { useAnimation } from '@/hooks/useAnimation';

function deepCloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map((row) =>
    row.map((cell) => ({ ...cell, parent: null }))
  );
}

function findPosition(grid: Cell[][], type: 'start' | 'end'): [number, number] {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (type === 'start' && grid[r][c].isStart) return [r, c];
      if (type === 'end' && grid[r][c].isEnd) return [r, c];
    }
  }
  return type === 'start' ? [1, 1] : [grid.length - 2, grid[0].length - 2];
}

function resetVisualization(grid: Cell[][]): Cell[][] {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      isVisited: false,
      isPath: false,
      isCurrent: false,
      parent: null,
    }))
  );
}

export default function Home() {
  const [gridSize, setGridSize] = useState(21);
  const [grid, setGrid] = useState<Cell[][] | null>(null);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bfs');
  const [speed, setSpeed] = useState(30);
  const [metrics, setMetrics] = useState<AlgorithmResult | null>(null);
  const [comparison, setComparison] = useState<ComparisonResult[]>([]);
  const [placingMode, setPlacingMode] = useState<'start' | 'end' | null>(null);

  const { animate, stop, animating } = useAnimation(speed);

  // Generate maze only on client to avoid hydration mismatch
  useEffect(() => {
    setGrid(generateMaze(gridSize, gridSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cellSize = useMemo(() => {
    if (gridSize <= 11) return 28;
    if (gridSize <= 21) return 20;
    if (gridSize <= 31) return 14;
    return 10;
  }, [gridSize]);

  const runAlgorithm = useCallback(
    (algo: AlgorithmType, g: Cell[][]): AlgorithmResult => {
      const start = findPosition(g, 'start');
      const end = findPosition(g, 'end');
      switch (algo) {
        case 'bfs':
          return bfs(g, start, end);
        case 'dfs':
          return dfs(g, start, end);
        case 'dijkstra':
          return dijkstra(g, start, end);
      }
    },
    []
  );

  const handleSolve = useCallback(() => {
    if (!grid) return;
    stop();
    const cleaned = resetVisualization(grid);
    setGrid(cleaned);
    setComparison([]);

    const result = runAlgorithm(algorithm, cleaned);
    setMetrics(result);

    animate(
      result,
      (r, c) => {
        setGrid((prev) => {
          if (!prev) return prev;
          const next = prev.map((row) => row.map((cell) => ({ ...cell, parent: null })));
          if (!next[r][c].isStart && !next[r][c].isEnd) {
            next[r][c].isVisited = true;
          }
          return next;
        });
      },
      (r, c) => {
        setGrid((prev) => {
          if (!prev) return prev;
          const next = prev.map((row) => row.map((cell) => ({ ...cell, parent: null })));
          if (!next[r][c].isStart && !next[r][c].isEnd) {
            next[r][c].isPath = true;
          }
          return next;
        });
      },
      () => {}
    );
  }, [grid, algorithm, animate, stop, runAlgorithm]);

  const handleCompareAll = useCallback(() => {
    if (!grid) return;
    stop();
    const cleaned = resetVisualization(grid);
    setGrid(cleaned);
    setMetrics(null);

    const algos: AlgorithmType[] = ['bfs', 'dfs', 'dijkstra'];
    const results: ComparisonResult[] = algos.map((algo) => ({
      algorithm: algo,
      result: runAlgorithm(algo, cleaned),
    }));

    setComparison(results);
  }, [grid, stop, runAlgorithm]);

  const handleReset = useCallback(() => {
    stop();
    setGrid((prev) => prev ? resetVisualization(prev) : prev);
    setMetrics(null);
    setComparison([]);
  }, [stop]);

  const handleGenerate = useCallback(() => {
    stop();
    setGrid(generateMaze(gridSize, gridSize));
    setMetrics(null);
    setComparison([]);
  }, [gridSize, stop]);

  const handleGridSizeChange = useCallback(
    (size: number) => {
      stop();
      setGridSize(size);
      setGrid(generateMaze(size, size));
      setMetrics(null);
      setComparison([]);
    },
    [stop]
  );

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (animating) return;
      if (!placingMode) return;

      setGrid((prev) => {
        if (!prev) return prev;
        const next = prev.map((r) => r.map((c) => ({ ...c, parent: null })));
        const cell = next[row][col];

        // Can only place on non-wall cells
        if (cell.isWall) return prev;

        if (placingMode === 'start') {
          // Remove old start
          for (const r of next) for (const c of r) c.isStart = false;
          next[row][col].isStart = true;
          next[row][col].isEnd = false;
        } else {
          // Remove old end
          for (const r of next) for (const c of r) c.isEnd = false;
          next[row][col].isEnd = true;
          next[row][col].isStart = false;
        }

        return next;
      });

      setPlacingMode(null);
    },
    [animating, placingMode]
  );

  return (
    <main className="min-h-screen bg-[#08080f] text-white font-body">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Maze */}
          <div className="flex-1 flex justify-center items-start">
            {grid ? (
              <MazeGrid
                grid={grid}
                onCellClick={handleCellClick}
                cellSize={cellSize}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-white/30 font-display text-sm">
                Generating maze...
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <Controls
              algorithm={algorithm}
              onAlgorithmChange={setAlgorithm}
              gridSize={gridSize}
              onGridSizeChange={handleGridSizeChange}
              speed={speed}
              onSpeedChange={setSpeed}
              onSolve={handleSolve}
              onReset={handleReset}
              onGenerate={handleGenerate}
              onCompareAll={handleCompareAll}
              animating={animating}
              placingMode={placingMode}
              onPlacingModeChange={setPlacingMode}
            />

            <div className="mt-4">
              <MetricsPanel result={metrics} algorithm={algorithm} />
            </div>
          </aside>
        </div>

        {/* Comparison Table */}
        <ComparisonTable results={comparison} />
      </div>

      <Footer />
    </main>
  );
}
