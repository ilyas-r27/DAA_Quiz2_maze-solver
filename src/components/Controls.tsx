'use client';

import { AlgorithmType } from '@/types';
import { SPEED_OPTIONS } from '@/utils/constants';

interface Props {
  algorithm: AlgorithmType;
  onAlgorithmChange: (algo: AlgorithmType) => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onSolve: () => void;
  onReset: () => void;
  onGenerate: () => void;
  onCompareAll: () => void;
  animating: boolean;
  placingMode: 'start' | 'end' | null;
  onPlacingModeChange: (mode: 'start' | 'end' | null) => void;
}

export default function Controls({
  algorithm,
  onAlgorithmChange,
  gridSize,
  onGridSizeChange,
  speed,
  onSpeedChange,
  onSolve,
  onReset,
  onGenerate,
  onCompareAll,
  animating,
  placingMode,
  onPlacingModeChange,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Algorithm Selector */}
      <div className="bg-[#141422] rounded-xl border border-white/5 p-4 space-y-3">
        <label className="text-xs font-display uppercase tracking-widest text-white/40">
          Algorithm
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { value: 'bfs' as AlgorithmType, label: 'BFS', desc: 'Shortest path (unweighted)' },
            { value: 'dfs' as AlgorithmType, label: 'DFS', desc: 'Depth exploration' },
            { value: 'dijkstra' as AlgorithmType, label: 'Dijkstra', desc: 'Shortest path (weighted)' },
          ].map((algo) => (
            <button
              key={algo.value}
              onClick={() => onAlgorithmChange(algo.value)}
              className={`text-left px-3 py-2.5 rounded-lg border transition-all ${
                algorithm === algo.value
                  ? 'bg-white/10 border-emerald-500/50 text-white'
                  : 'border-white/5 text-white/50 hover:border-white/20 hover:text-white/80'
              }`}
            >
              <span className="font-display text-sm font-bold">{algo.label}</span>
              <span className="block text-[10px] mt-0.5 opacity-60">{algo.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Size */}
      <div className="bg-[#141422] rounded-xl border border-white/5 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-display uppercase tracking-widest text-white/40">
            Grid Size
          </label>
          <span className="font-display text-sm text-emerald-400">
            {gridSize}×{gridSize}
          </span>
        </div>
        <input
          type="range"
          min={11}
          max={51}
          step={2}
          value={gridSize}
          onChange={(e) => onGridSizeChange(+e.target.value)}
          className="w-full accent-emerald-500"
        />
      </div>

      {/* Speed */}
      <div className="bg-[#141422] rounded-xl border border-white/5 p-4 space-y-3">
        <label className="text-xs font-display uppercase tracking-widest text-white/40">
          Speed
        </label>
        <div className="flex gap-2">
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s.label}
              onClick={() => onSpeedChange(s.value)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-display font-bold transition-all ${
                speed === s.value
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Start / End Placement */}
      <div className="bg-[#141422] rounded-xl border border-white/5 p-4 space-y-3">
        <label className="text-xs font-display uppercase tracking-widest text-white/40">
          Place Points
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onPlacingModeChange(placingMode === 'start' ? null : 'start')}
            className={`flex-1 py-2 rounded-lg text-xs font-display font-bold transition-all ${
              placingMode === 'start'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10'
            }`}
          >
            ◉ Start
          </button>
          <button
            onClick={() => onPlacingModeChange(placingMode === 'end' ? null : 'end')}
            className={`flex-1 py-2 rounded-lg text-xs font-display font-bold transition-all ${
              placingMode === 'end'
                ? 'bg-red-500 text-white'
                : 'bg-white/5 text-red-400 border border-red-500/30 hover:bg-red-500/10'
            }`}
          >
            ◉ End
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onSolve}
          disabled={animating}
          className="w-full py-3 rounded-xl font-display font-bold text-sm
            bg-gradient-to-r from-emerald-500 to-emerald-600 text-white
            hover:from-emerald-400 hover:to-emerald-500
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all shadow-lg shadow-emerald-500/20"
        >
          {animating ? '⏳ Solving...' : '▶ Solve'}
        </button>

        <button
          onClick={onCompareAll}
          disabled={animating}
          className="w-full py-3 rounded-xl font-display font-bold text-sm
            bg-gradient-to-r from-purple-500 to-pink-500 text-white
            hover:from-purple-400 hover:to-pink-400
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all shadow-lg shadow-purple-500/20"
        >
          ⚡ Compare All
        </button>

        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="flex-1 py-2.5 rounded-xl font-display font-bold text-xs
              bg-white/5 text-white/60 border border-white/10
              hover:bg-white/10 hover:text-white transition-all"
          >
            ↺ Reset
          </button>
          <button
            onClick={onGenerate}
            className="flex-1 py-2.5 rounded-xl font-display font-bold text-xs
              bg-white/5 text-white/60 border border-white/10
              hover:bg-white/10 hover:text-white transition-all"
          >
            ⟳ New Maze
          </button>
        </div>
      </div>
    </div>
  );
}
