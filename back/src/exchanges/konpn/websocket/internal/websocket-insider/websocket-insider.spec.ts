import { WebsocketInsider } from './websocket-insider';

jest.setTimeout(1000 * 60 * 60);
describe('WebsocketInsider', () => {
  let wsInsider: WebsocketInsider;

  beforeEach(() => {
    wsInsider = new WebsocketInsider();
  });
  it('subscribe', done => {
    wsInsider.subscribe('EURJPY').subscribe(o => {
      /**
         {
          "M": "",
          "S": "EURJPY",
          "C": "",
          "Tick": 1589816995,
          "P": 117.116,
          "O": 115.859,
          "H": 117.15,
          "L": 115.746,
          "V": 108075,
          "M1": "1589816940,117.095,117.128,117.088,319",
          "M5": "1589816700,116.959,117.149,116.946,1672",
          "M10": "1589816400,116.817,117.149,116.816,2675",
          "M15": "1589816700,116.959,117.149,116.946,1672",
          "M30": "1589815800,116.818,117.149,116.756,4798",
          "H1": "1589814000,116.610,117.149,116.565,12182",
          "H2": "1589810400,116.683,117.149,116.565,22172",
          "H4": "1589803200,116.057,117.149,116.048,43429"
        }
       */
      console.log(o);
    });
    setTimeout(() => {
      done();
    }, 10000000);
  });

  /*it('destroy', done => {
    const channel = getChannelName({
      pair: 'btcusdt',
      action: Period.min1,
      endpoint: WsPublicEndpoints.Kline,
    });
    wsInsider.subscribe(channel).subscribe(o => {
      console.log(o);
    });
    setTimeout(() => {
      wsInsider.destroy();
    }, 2000);
    setTimeout(() => {
      done();
    }, 10000000);
  });*/
});
