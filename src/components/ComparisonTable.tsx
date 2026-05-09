'use client';

import { ComparisonResult } from '@/types';

interface Props {
  results: ComparisonResult[];
}

const ALGO_COLORS: Record<string, string> = {
  bfs: 'text-sky-400',
  dfs: 'text-orange-400',
  dijkstra: 'text-purple-400',
};

export default function ComparisonTable({ results }: Props) {
  if (results.length === 0) return null;

  const bestPath = Math.min(...results.map((r) => r.result.pathLength).filter(l => l > 0));
  const bestVisited = Math.min(...results.map((r) => r.result.nodesVisited));
  const bestTime = Math.min(...results.map((r) => r.result.executionTime));

  return (
    <div className="bg-[#141422] rounded-xl border border-white/5 p-5 mt-6">
      <h3 className="text-xs font-display uppercase tracking-widest text-white/40 mb-4">
        ⚡ Algorithm Comparison
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-3 text-xs font-display text-white/30 uppercase tracking-wider">
                Metric
              </th>
              {results.map((r) => (
                <th
                  key={r.algorithm}
                  className={`text-center py-2 px-3 text-xs font-display uppercase tracking-wider ${
                    ALGO_COLORS[r.algorithm]
                  }`}
                >
                  {r.algorithm.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-body">
            <tr className="border-b border-white/5">
              <td className="py-2.5 px-3 text-white/50 text-xs">Nodes Visited</td>
              {results.map((r) => (
                <td
                  key={r.algorithm}
                  className={`text-center py-2.5 px-3 font-display font-bold ${
                    r.result.nodesVisited === bestVisited
                      ? 'text-emerald-400'
                      : 'text-white/70'
                  }`}
                >
                  {r.result.nodesVisited}
                  {r.result.nodesVisited === bestVisited && ' ★'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2.5 px-3 text-white/50 text-xs">Path Length</td>
              {results.map((r) => (
                <td
                  key={r.algorithm}
                  className={`text-center py-2.5 px-3 font-display font-bold ${
                    r.result.pathLength === bestPath && r.result.pathLength > 0
                      ? 'text-emerald-400'
                      : r.result.pathLength === 0
                      ? 'text-red-400'
                      : 'text-white/70'
                  }`}
                >
                  {r.result.pathLength === 0 ? 'N/A' : r.result.pathLength}
                  {r.result.pathLength === bestPath && r.result.pathLength > 0 && ' ★'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2.5 px-3 text-white/50 text-xs">Exec Time</td>
              {results.map((r) => (
                <td
                  key={r.algorithm}
                  className={`text-center py-2.5 px-3 font-display font-bold ${
                    r.result.executionTime === bestTime
                      ? 'text-emerald-400'
                      : 'text-white/70'
                  }`}
                >
                  {r.result.executionTime.toFixed(2)}ms
                  {r.result.executionTime === bestTime && ' ★'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 px-3 text-white/50 text-xs">Shortest?</td>
              {results.map((r) => (
                <td
                  key={r.algorithm}
                  className="text-center py-2.5 px-3 font-display font-bold"
                >
                  {r.result.pathLength === 0 ? (
                    <span className="text-red-400">—</span>
                  ) : r.result.pathLength === bestPath ? (
                    <span className="text-emerald-400">Yes ✓</span>
                  ) : (
                    <span className="text-white/40">No</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
