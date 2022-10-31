import { useEffect, useState } from 'react';
import Area from '../components/Area';
import ActionBar from '../components/ActionBar';
import Legend from '../components/Legend';
import styles from './Trajectories.module.scss';
import { TragectoriesAdapterResult } from '../Adapters/trajectoriesAdapter';

function Trajectories({
  trajectories
}: {
  trajectories: TragectoriesAdapterResult;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [hilightedTrajectory, setHilightedTrajectory] = useState<null | string>(
    null
  );
  const [playing, setPlaying] = useState(false);
  const {
    cleannedTrajectories,
    minStartingTime,
    maxEndingTime,
    areaDimensions
  } = trajectories;

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout> | undefined;

    if (playing && currentTime <= maxEndingTime) {
      timeOut = setTimeout(() => {
        setCurrentTime((prev) => prev + 1);
      }, 20);
    }

    if (currentTime >= maxEndingTime) {
      setPlaying(false);
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [maxEndingTime, currentTime, playing, setPlaying]);

  return (
    <div>
      <ActionBar
        currentTime={currentTime}
        cleannedTrajectories={cleannedTrajectories}
        minStartingTime={minStartingTime}
        maxEndingTime={maxEndingTime}
        setCurrentTime={setCurrentTime}
        setPlaying={setPlaying}
        playing={playing}
      />

      <Legend
        cleannedTrajectories={cleannedTrajectories}
        currentTime={currentTime}
        setHilightedTrajectory={setHilightedTrajectory}
        hilightedTrajectory={hilightedTrajectory}
        setCurrentTime={setCurrentTime}
      />

      <div className={styles.AreaWrapper}>
        <Area
          cleannedTrajectories={cleannedTrajectories}
          areaDimensions={areaDimensions}
          currentTime={currentTime}
          hilightedTrajectory={hilightedTrajectory}
        />
      </div>
    </div>
  );
}

export default Trajectories;
