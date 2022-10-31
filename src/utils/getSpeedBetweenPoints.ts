import type { TrajectoryPoint } from '../stubs/trajectories';

export const getSpeedBetweenPoints = (
  a: TrajectoryPoint,
  b: TrajectoryPoint
): { startTime: number; distance: number; duration: number; speed: number } => {
  const duration = b.time - a.time;
  const xDistance = a.x - b.x;
  const yDistance = a.y - b.y;
  const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  const speed = distance / duration;

  return {
    startTime: a.time,
    distance,
    duration,
    speed
  };
};
