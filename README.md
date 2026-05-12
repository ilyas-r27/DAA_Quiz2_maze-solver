# MazeSolver - BFS, DFS, Dijkstra Visualize e

Interactive web application for visualizing pathfinding algorithms on randomly generated mazes.

**DAA Quiz 2 - EF234405 Design & Analysis of Algorithms**  
Institut Teknologi Sepuluh Nopember (ITS)

## Features

- **Random Maze Generation** - Recursive backtracking algorithm creates perfect mazes
- **Three Algorithms** - BFS (shortest path), DFS (depth exploration), Dijkstra (weighted shortest path)
- **Step-by-Step Animation** - Watch algorithms explore the maze in real-time
- **Weighted Terrain** - Mud (×3) and Water (×5) cells for Dijkstra
- **Custom Start/End** - Click to place start and end points
- **Speed Control** - Slow, Medium, Fast animation speeds
- **Grid Size Control** - From 11×11 to 51×51
- **Compare All** - Run all three algorithms and compare results side-by-side

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Algorithms

| Algorithm | Time Complexity | Shortest Path? | Handles Weights? |
|-----------|----------------|----------------|-----------------|
| BFS       | O(V + E)       | Yes (unweighted) | No            |
| DFS       | O(V + E)       | No             | No              |
| Dijkstra  | O((V+E) log V) | Yes (weighted) | Yes             |

## Project Structure

```
src/
├── algorithms/       # BFS, DFS, Dijkstra, MinHeap, Maze Generator
├── app/              # Next.js App Router pages
├── components/       # React UI components
├── hooks/            # Animation hook
├── types/            # TypeScript interfaces
└── utils/            # Constants
```
