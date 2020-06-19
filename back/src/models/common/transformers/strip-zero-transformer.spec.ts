import { stripZeroTransformer } from './strip-zero-transformer';

describe('stripZeroTransformer', () => {
  it('should work', () => {
    expect(stripZeroTransformer.from('1.000')).toBe('1');
    expect(stripZeroTransformer.from('10000')).toBe('10000');
    expect(stripZeroTransformer.from(null)).toBe(null);
    expect(stripZeroTransformer.to('1.000')).toBe('1');
    expect(stripZeroTransformer.to('10000')).toBe('10000');
    expect(stripZeroTransformer.to(null)).toBe(null);
  });
});
