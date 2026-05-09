'use client';

import { useState, useRef, useCallback } from 'react';
import { AlgorithmResult } from '@/types';

export function useAnimation(speed: number) {
  const [animating, setAnimating] = useState(false);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  const animate = useCallback(
    (
      result: AlgorithmResult,
      onVisit: (r: number, c: number) => void,
      onPath: (r: number, c: number) => void,
      onComplete: () => void
    ) => {
      setAnimating(true);
      timeoutIds.current = [];

      // Animate visited cells
      result.visitedOrder.forEach(([r, c], i) => {
        const id = setTimeout(() => onVisit(r, c), i * speed);
        timeoutIds.current.push(id);
      });

      // Animate solution path after exploration
      const pathStart = result.visitedOrder.length * speed;
      result.path.forEach(([r, c], i) => {
        const id = setTimeout(() => onPath(r, c), pathStart + i * (speed * 3));
        timeoutIds.current.push(id);
      });

      // Mark complete
      const totalTime = pathStart + result.path.length * (speed * 3);
      const doneId = setTimeout(() => {
        setAnimating(false);
        onComplete();
      }, totalTime);
      timeoutIds.current.push(doneId);
    },
    [speed]
  );

  const stop = useCallback(() => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setAnimating(false);
  }, []);

  return { animate, stop, animating };
}
