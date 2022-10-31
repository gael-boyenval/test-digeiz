import { trajectories } from '../stubs/trajectories';
import { getAreaDimensions } from './getAreaDimensions';

describe('getAreaDimensions', () => {
  it('return maximum x and y values', () => {
    const dimensions = getAreaDimensions(trajectories);
    expect(dimensions.x).toStrictEqual(10);
    expect(dimensions.y).toStrictEqual(6.3);
  });
});
