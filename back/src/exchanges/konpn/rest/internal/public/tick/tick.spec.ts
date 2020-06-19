import { Tick } from './tick';

describe('Rest Tick', () => {
  const tick = new Tick();

  it('fetch tick', async () => {
    const res = await tick.fetch('EURJPY').toPromise();
    expect(res).toBeDefined();
  });
});
