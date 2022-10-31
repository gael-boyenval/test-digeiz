import type { TTrajectory, TrajectoryPoint } from '../stubs/trajectories';

export const getAreaDimensions = (
  trajectories: TTrajectory[]
): { x: number; y: number } => {
  const AllXPositionValues = trajectories.flatMap((trajectory: TTrajectory) =>
    trajectory.points.map((point: TrajectoryPoint) => point.x)
  );

  const AllYPositionValues = trajectories.flatMap((trajectory: TTrajectory) =>
    trajectory.points.map((point: TrajectoryPoint) => point.y)
  );

  return {
    x: Math.max(...AllXPositionValues),
    y: Math.max(...AllYPositionValues)
  };
};
