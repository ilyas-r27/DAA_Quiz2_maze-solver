export const COLORS = {
  wall: '#0f0f1a',
  path: '#ffffff',
  start: '#2ecc71',
  end: '#e94560',
  visited: '#74b9ff',
  solution: '#ffc107',
  current: '#a855f7',
  mud: '#92400e',
  water: '#1e3a5f',
} as const;

export const GRID_SIZES = [
  { label: '11×11', value: 11 },
  { label: '21×21', value: 21 },
  { label: '31×31', value: 31 },
  { label: '51×51', value: 51 },
] as const;

export const SPEED_OPTIONS = [
  { label: 'Slow', value: 80 },
  { label: 'Medium', value: 30 },
  { label: 'Fast', value: 5 },
] as const;
