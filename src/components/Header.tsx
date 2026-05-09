'use client';

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-[#0a0a14] border-b border-white/5">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-display uppercase tracking-widest text-emerald-400">
            DAA Quiz 2 — EF234405
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Maze<span className="text-emerald-400">Solver</span>
        </h1>

        <p className="mt-3 text-sm font-body text-white/40 max-w-md mx-auto">
          Visualize and compare BFS, DFS, and Dijkstra pathfinding algorithms
          on randomly generated mazes with weighted terrain.
        </p>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-display text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" /> Start
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-red-500" /> End
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-sky-400/70" /> Visited
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-yellow-400" /> Path
          </span>
        </div>
      </div>
    </header>
  );
}
