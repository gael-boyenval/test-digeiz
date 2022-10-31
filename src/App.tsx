import { useEffect, useState } from 'react';
import { fakeGetTrajectories } from './stubs/trajectories';
import { tragectoriesAdapter } from './Adapters/trajectoriesAdapter';
import type { TragectoriesAdapterResult } from './Adapters/trajectoriesAdapter';
import Loading from './views/Loading';
import Trajectories from './views/Trajectories';

function App() {
  const [fetcher, setFetcher] = useState<{
    isReady: boolean;
    data: TragectoriesAdapterResult | null;
  }>({ isReady: false, data: null });

  useEffect(() => {
    const load = async () => {
      const data = await fakeGetTrajectories<TragectoriesAdapterResult>(
        tragectoriesAdapter
      );
      setFetcher({ isReady: true, data });
    };
    load();
  }, []);

  return fetcher.isReady && fetcher.data ? (
    <Trajectories trajectories={fetcher.data} />
  ) : (
    <Loading />
  );
}

export default App;
