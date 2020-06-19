import { Kline } from './kline';
import { WebsocketInsider } from '../../websocket-insider';
import { Period } from '../../../../types';

jest.setTimeout(1000 * 60 * 60);
describe('Kline', () => {
  let kline: Kline;
  let ws: WebsocketInsider;
  const symbol = 'EURJPY';

  beforeEach(() => {
    ws = new WebsocketInsider();
    kline = new Kline(ws);
  });
  afterAll(() => {
    ws.destroy();
  });

  it('lastKline$', done => {
    kline.lastKline$(symbol, Period.min1).subscribe(o => console.log(o));
    setTimeout(() => {
      kline.stopLastKline(symbol);
      done();
    }, 3000);
  });
});
