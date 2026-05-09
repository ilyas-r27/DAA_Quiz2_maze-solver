'use client';

import { AlgorithmResult, AlgorithmType } from '@/types';

interface Props {
  result: AlgorithmResult | null;
  algorithm: AlgorithmType;
}

const ALGO_LABELS: Record<AlgorithmType, string> = {
  bfs: 'BFS',
  dfs: 'DFS',
  dijkstra: 'Dijkstra',
};

export default function MetricsPanel({ result, algorithm }: Props) {
  if (!result) return null;

  const metrics = [
    { label: 'Nodes Visited', value: result.nodesVisited, icon: '🔍' },
    { label: 'Path Length', value: result.pathLength, icon: '📏' },
    {
      label: 'Exec Time',
      value: `${result.executionTime.toFixed(2)} ms`,
      icon: '⚡',
    },
  ];

  return (
    <div className="bg-[#141422] rounded-xl border border-white/5 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <h3 className="text-xs font-display uppercase tracking-widest text-white/40">
          {ALGO_LABELS[algorithm]} Results
        </h3>
      </div>

      <div className="space-y-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="flex justify-between items-center py-2 px-3 rounded-lg bg-white/[0.03]"
          >
            <span className="text-xs text-white/50 font-body">
              {m.icon} {m.label}
            </span>
            <span className="font-display font-bold text-sm text-white">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {result.pathLength === 0 && (
        <div className="text-center py-2 text-xs text-red-400 font-display">
          ⚠ No path found!
        </div>
      )}
    </div>
  );
}
