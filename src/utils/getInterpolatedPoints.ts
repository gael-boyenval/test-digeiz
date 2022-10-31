import type { TrajectoryPoint } from '../stubs/trajectories';

// interpolate trajectories to return one point for each unit of time
export const getInterpolatedPoints = (
  sortedPoints: TrajectoryPoint[]
): TrajectoryPoint[] => {
  const interpolatedTrajectories: TrajectoryPoint[] = [];

  sortedPoints.forEach((point, i) => {
    interpolatedTrajectories.push(point);
    const currentPoint = point;
    const nextPoint = sortedPoints[i + 1];
    if (nextPoint?.time) {
      const diffInSecond = nextPoint.time - currentPoint.time;
      const xIncrement = (nextPoint.x - currentPoint.x) / diffInSecond;
      const yIncrement = (nextPoint.y - currentPoint.y) / diffInSecond;

      for (let iter = 1; iter < diffInSecond; iter++) {
        interpolatedTrajectories.push({
          time: currentPoint.time + iter,
          x: currentPoint.x + xIncrement * iter,
          y: currentPoint.y + yIncrement * iter
        });
      }
    }
  });

  return interpolatedTrajectories;
};
