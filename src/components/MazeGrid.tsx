'use client';

import { Cell } from '@/types';

interface Props {
  grid: Cell[][];
  onCellClick: (row: number, col: number) => void;
  cellSize: number;
}

function getCellColor(cell: Cell): string {
  if (cell.isStart) return 'bg-emerald-500';
  if (cell.isEnd) return 'bg-red-500';
  if (cell.isPath) return 'bg-yellow-400';
  if (cell.isCurrent) return 'bg-purple-500';
  if (cell.isVisited) return 'bg-sky-400/70';
  if (cell.isWall) return 'bg-[#0f0f1a]';
  return 'bg-white/90';
}

function getCellLabel(cell: Cell): string {
  if (cell.isStart) return 'S';
  if (cell.isEnd) return 'E';
  return '';
}

export default function MazeGrid({ grid, onCellClick, cellSize }: Props) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  return (
    <div className="relative overflow-auto rounded-xl border border-white/10 bg-[#0a0a14] p-2 shadow-2xl shadow-black/50">
      <div
        className="inline-grid gap-[1px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {grid.flat().map((cell) => (
          <div
            key={`${cell.row}-${cell.col}`}
            onClick={() => onCellClick(cell.row, cell.col)}
            className={`
              flex items-center justify-center
              cursor-pointer transition-colors duration-100
              rounded-[2px] text-[8px] font-bold
              ${getCellColor(cell)}
              ${cell.isStart || cell.isEnd ? 'text-white ring-1 ring-white/30' : 'text-white/60'}
              ${cell.isPath ? 'shadow-sm shadow-yellow-400/50' : ''}
            `}
            title={
              cell.isStart ? 'Start' :
              cell.isEnd ? 'End' :
              cell.isWall ? 'Wall' : 'Path'
            }
          >
            {cellSize >= 14 ? getCellLabel(cell) : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
