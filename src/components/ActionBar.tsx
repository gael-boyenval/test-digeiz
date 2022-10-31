import type { CleannedTrajectory } from '../Adapters/trajectoriesAdapter';
import styles from './ActionBar.module.scss';
import { toHoursString } from '../utils/unitConverters';

type ActionBarProps = {
  currentTime: number;
  cleannedTrajectories: CleannedTrajectory[];
  minStartingTime: number;
  maxEndingTime: number;
  setCurrentTime: (time: number) => void;
  setPlaying: (bool: boolean) => void;
  playing: boolean;
};

const ActionBar = ({
  currentTime,
  cleannedTrajectories,
  minStartingTime,
  maxEndingTime,
  setCurrentTime,
  setPlaying,
  playing
}: ActionBarProps) => (
  <div className={styles.ActionBar}>
    <div className={styles.ActionBar_DataBlock}>
      TIME :{' '}
      <span
        className={`${styles.ActionBar_DataValue} ${styles.ActionBar_DataValueTime}`}
      >
        {toHoursString(currentTime)}
      </span>
    </div>
    <div className={styles.ActionBar_DataBlock}>
      VISITOR ON SITE :{' '}
      <span
        className={`${styles.ActionBar_DataValue} ${styles.ActionBar_DataValueVisitors}`}
      >
        {
          cleannedTrajectories.filter(
            ({ startingTime, endingTime }) =>
              currentTime >= startingTime && currentTime <= endingTime
          ).length
        }
      </span>
    </div>
    <div className={styles.ActionBar_RangeWrapper}>
      <input
        type="range"
        id="volume"
        name="volume"
        value={currentTime}
        min={minStartingTime}
        max={maxEndingTime}
        onChange={(e) => {
          setCurrentTime(Number(e.target.value));
          setPlaying(false);
        }}
        aria-label="move time-line"
      />
    </div>
    <button
      onClick={() => setPlaying(!playing)}
      className={styles.ActionBar_PlayPauseButton}
    >
      <svg width={18} viewBox="0 0 18 18">
        {playing ? (
          <>
            <rect x={0} y={0} width={7} height={18} fill="#333" />
            <rect x={11} y={0} width={7} height={18} fill="#333" />
          </>
        ) : (
          <path d="M 16,9 2,18 2,0 z" fill="#333" />
        )}
      </svg>
    </button>
  </div>
);

export default ActionBar;
