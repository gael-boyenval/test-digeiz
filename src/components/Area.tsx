import type { CleannedTrajectory } from '../Adapters/trajectoriesAdapter';
import { line } from 'd3-shape';
import styles from './Area.module.scss';
import { toHoursString } from '../utils/unitConverters';

type AreaProps = {
  currentTime: number;
  cleannedTrajectories: CleannedTrajectory[];
  areaDimensions: { x: number; y: number };
  hilightedTrajectory: string | null;
};

const Area = ({
  currentTime,
  cleannedTrajectories,
  areaDimensions,
  hilightedTrajectory
}: AreaProps) => {
  return (
    <svg
      viewBox={`0 0 ${areaDimensions.x} ${areaDimensions.y}`}
      vectorEffect="non-scaling-stroke"
      className={styles.Area}
    >
      {cleannedTrajectories.map(
        (trajectory) =>
          trajectory.trajectoryLine && (
            <g
              className={
                hilightedTrajectory && hilightedTrajectory !== trajectory.id
                  ? `${styles.Trajectory} ${styles.Trajectory_IsDimmed}`
                  : styles.Trajectory
              }
            >
              <path
                key={`path-${trajectory.id}`}
                d={line()(trajectory.trajectoryLine) as string}
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                stroke={trajectory.color}
                fill="transparent"
                style={{ opacity: 0.3 }}
              />

              {trajectory.interpolatedPoints.map((point) => {
                const isCurrentTimePoint = currentTime === point.time;
                return (
                  <circle
                    data-time={point.time}
                    key={`${trajectory.id}-point-${point.time}`}
                    cx={point.x}
                    cy={point.y}
                    r={isCurrentTimePoint ? 0.1 : 0.05}
                    fill={trajectory.color}
                    stroke="#FFF"
                    strokeWidth={isCurrentTimePoint ? 3 : 0}
                    style={
                      isCurrentTimePoint
                        ? {
                            opacity: 1,
                            position: 'relative',
                            zIndex: 1
                          }
                        : { opacity: 0.2 }
                    }
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
              {trajectory.detectionPoints.map((point) => {
                const isCloseToDetectionPoint =
                  point.time >= currentTime - 5 &&
                  point.time <= currentTime + 5;
                return (
                  <>
                    <g
                      x={point.x + 0.12}
                      y={point.y - 0.12}
                      font-size="0.1"
                      className={styles.Trajectory_DetectionPointCoordinates}
                      style={{
                        fill: isCloseToDetectionPoint
                          ? '#333'
                          : 'rgba(0,0,0,0)',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      <text x={point.x + 0.2} y={point.y - 0.24}>
                        t : {toHoursString(point.time)}
                      </text>
                      <text x={point.x + 0.2} y={point.y - 0.12}>
                        x : {point.x}
                      </text>
                      <text x={point.x + 0.2} y={point.y}>
                        y : {point.y}
                      </text>
                    </g>
                    <circle
                      key={`${trajectory.id}-point-${point.time}`}
                      cx={point.x}
                      cy={point.y}
                      r={0.15}
                      strokeWidth={isCloseToDetectionPoint ? 3 : 1}
                      style={{
                        opacity: isCloseToDetectionPoint ? 1 : 0.4,
                        transition:
                          'opacity 200ms ease, stroke-width 200ms ease'
                      }}
                      stroke={trajectory.color}
                      fill="transparent"
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                );
              })}
            </g>
          )
      )}
    </svg>
  );
};

export default Area;
