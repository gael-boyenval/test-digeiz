import type { TrajectoryPoint, TTrajectory } from '../stubs/trajectories';
import { getAreaDimensions } from '../utils/getAreaDimensions';
import { hashToColor } from '../utils/hashToColor';
import { getInterpolatedPoints } from '../utils/getInterpolatedPoints';
import { getSpeedBetweenPoints } from '../utils/getSpeedBetweenPoints';

type EstimatedSpeed = {
  startTime: number;
  distance: number;
  duration: number;
  speed: number;
};

export type CleannedTrajectory = {
  startingTime: number;
  endingTime: number;
  id: string;
  color: string;
  detectionPoints: TrajectoryPoint[];
  interpolatedPoints: TrajectoryPoint[];
  trajectoryLine: [x: number, y: number][] | null;
  detectionsAnalysis: {
    numberOfStops: number;
    totalDuration: number;
    estimatedSpeeds: EstimatedSpeed[];
    totalDistance: number;
  };
};

export type TragectoriesAdapterResult = {
  cleannedTrajectories: CleannedTrajectory[];
  minStartingTime: number;
  maxEndingTime: number;
  areaDimensions: {
    x: number;
    y: number;
  };
};

export const tragectoriesAdapter = (
  trajectories: TTrajectory[]
): TragectoriesAdapterResult => {
  const cleannedTrajectories: CleannedTrajectory[] = [];
  const areaDimensions = getAreaDimensions(trajectories);

  trajectories.forEach((trajectory) => {
    const detectionPointsByTime = trajectory.points.sort(
      (a, b) => a.time - b.time
    );

    const linePoints: [x: number, y: number][] = detectionPointsByTime.map(
      (point) => [point.x, point.y]
    );

    const estimatedSpeeds: EstimatedSpeed[] = [];

    detectionPointsByTime.forEach((point, index) => {
      if (detectionPointsByTime[index + 1]) {
        const currentPoint = point;
        const nextPoint = detectionPointsByTime[index + 1];
        estimatedSpeeds.push(getSpeedBetweenPoints(currentPoint, nextPoint));
      }
    });

    const startingTime = detectionPointsByTime[0].time;
    const endingTime = [...detectionPointsByTime].reverse()[0].time;
    const totalDuration = endingTime - startingTime;
    const totalDistance = estimatedSpeeds.reduce(
      (acc, est) => acc + est.distance,
      0
    );

    const numberOfStops = estimatedSpeeds.filter(
      ({ speed, distance }) => speed === 0 && distance === 0
    ).length;

    cleannedTrajectories.push({
      startingTime,
      endingTime,
      color: hashToColor(trajectory.id),
      id: trajectory.id,
      detectionPoints: detectionPointsByTime,
      detectionsAnalysis: {
        totalDuration,
        estimatedSpeeds,
        totalDistance,
        numberOfStops
      },
      interpolatedPoints: getInterpolatedPoints(detectionPointsByTime),
      trajectoryLine: linePoints
    });
  });

  const minStartingTime = Math.min(
    ...cleannedTrajectories.map(({ startingTime }) => startingTime)
  );

  const maxEndingTime = Math.max(
    ...cleannedTrajectories.map(({ endingTime }) => endingTime)
  );

  return {
    cleannedTrajectories,
    minStartingTime,
    maxEndingTime,
    areaDimensions
  };
};
