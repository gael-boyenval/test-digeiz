import type { CleannedTrajectory } from '../Adapters/trajectoriesAdapter';
import styles from './Legend.module.scss';
import { useState } from 'react';
import { toHoursString, toMeters, speedToKmH } from '../utils/unitConverters';

type LegendProps = {
  currentTime: number;
  cleannedTrajectories: CleannedTrajectory[];
  setHilightedTrajectory: (id: string | null) => void;
  setCurrentTime: (time: number) => void;
  hilightedTrajectory: string | null;
};

const Legend = ({
  cleannedTrajectories,
  currentTime,
  setHilightedTrajectory,
  hilightedTrajectory,
  setCurrentTime
}: LegendProps) => {
  const [infosOpen, setInfoOpen] = useState<string | null>(null);
  return (
    <div className={styles.Legend}>
      {cleannedTrajectories.map((trajectory) => (
        <>
          <div
            onClick={() => {
              setHilightedTrajectory(
                hilightedTrajectory === trajectory.id ? null : trajectory.id
              );
              setInfoOpen(infosOpen === trajectory.id ? null : trajectory.id);
            }}
            key={`legend-${trajectory.id}`}
            className={`${styles.Legend_Item} ${
              infosOpen === trajectory.id ? styles.Legend_ItemIsOpen : ''
            }`}
          >
            <span
              className={styles.Legend_ItemColor}
              style={{ background: trajectory.color }}
            />{' '}
            {trajectory.id}
            <sup className={styles.Legend_ItemOnSiteIndicator}>
              {trajectory.endingTime >= currentTime &&
                trajectory.startingTime <= currentTime &&
                'ON SITE'}
            </sup>
          </div>
          <div
            className={`${styles.Legend_ItemInfos} ${
              infosOpen && infosOpen === trajectory.id
                ? styles.Legend_ItemInfosIsOpen
                : ''
            }`}
          >
            <div className={styles.LabeledValue}>
              <span className={styles.LabeledValue_Label}>Average speed :</span>
              <span className={styles.LabeledValue_Value}>
                {speedToKmH(
                  trajectory.detectionsAnalysis.totalDistance,
                  trajectory.detectionsAnalysis.totalDuration
                )}
                km/h
              </span>
            </div>
            <div className={styles.LabeledValue}>
              <span className={styles.LabeledValue_Label}>
                number of stops:
              </span>
              <span className={styles.LabeledValue_Value}>
                {trajectory.detectionsAnalysis.numberOfStops}
              </span>
            </div>
            <div className={styles.LabeledValue}>
              <span className={styles.LabeledValue_Label}>
                Visite duration :
              </span>
              <span className={styles.LabeledValue_Value}>
                {toHoursString(trajectory.detectionsAnalysis.totalDuration)}
              </span>
            </div>
            <div className={styles.LabeledValue}>
              <span className={styles.LabeledValue_Label}>
                Distance Parcourue :
              </span>
              <span className={styles.LabeledValue_Value}>
                {toMeters(trajectory.detectionsAnalysis.totalDistance)}m
              </span>
            </div>
            <ol>
              {trajectory.detectionsAnalysis.estimatedSpeeds.map(
                (trajectorySection) => (
                  <li
                    key={`${trajectory.id}-${trajectorySection.startTime}`}
                    onClick={() => setCurrentTime(trajectorySection.startTime)}
                  >
                    {trajectorySection.distance === 0 &&
                    trajectorySection.duration > 0 ? (
                      <div
                        className={
                          styles.LabeledValue + ' ' + styles.LabeledValueSmall
                        }
                      >
                        {' '}
                        <h3>
                          STOPPED FOR{' '}
                          {toHoursString(trajectorySection.duration)}
                        </h3>
                      </div>
                    ) : (
                      <>
                        <div
                          className={
                            styles.LabeledValue + ' ' + styles.LabeledValueSmall
                          }
                        >
                          <span className={styles.LabeledValue_Label}>
                            duration :
                          </span>
                          <span className={styles.LabeledValue_Value}>
                            {toHoursString(trajectorySection.duration)}
                          </span>
                        </div>
                        <div
                          className={
                            styles.LabeledValue + ' ' + styles.LabeledValueSmall
                          }
                        >
                          <span className={styles.LabeledValue_Label}>
                            speed :
                          </span>
                          <span className={styles.LabeledValue_Value}>
                            {speedToKmH(
                              trajectorySection.distance,
                              trajectorySection.duration
                            )}
                            km/h
                          </span>
                        </div>
                        <div
                          className={
                            styles.LabeledValue + ' ' + styles.LabeledValueSmall
                          }
                        >
                          <span className={styles.LabeledValue_Label}>
                            distance :
                          </span>
                          <span className={styles.LabeledValue_Value}>
                            {toMeters(trajectorySection.distance)}m
                          </span>
                        </div>
                      </>
                    )}
                  </li>
                )
              )}
            </ol>
          </div>
        </>
      ))}
    </div>
  );
};

export default Legend;
