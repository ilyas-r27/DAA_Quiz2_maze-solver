import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MazeSolver — BFS, DFS, Dijkstra Visualizer',
  description:
    'Interactive maze solver visualizing BFS, DFS, and Dijkstra pathfinding algorithms. DAA Quiz 2 — EF234405.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
