import { Symbols } from './symbols';

describe('Rest Symbols', () => {
  const symbols = new Symbols();

  it('fetch symbols', async () => {
    const res = await symbols.fetch('EURJPY').toPromise();
    expect(res).toBeDefined();
  });
});
