import {
  DatafeedConfiguration,
  ErrorCallback,
  HistoryCallback,
  IDatafeedChartApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolutionString,
  ResolveCallback,
  SubscribeBarsCallback,
  SearchSymbolsCallback,
  Bar,
} from '../../../charting_library/datafeed-api';

interface Window {
  socket: any;
  onTick?: SubscribeBarsCallback;
}

declare var window: Window;

declare var pako: any;

export interface UdfCompatibleConfiguration extends DatafeedConfiguration {
  supports_search?: boolean;
  supports_group_request?: boolean;
}

export class UDFCompatibleDatafeed implements IExternalDatafeed, IDatafeedChartApi {

  public onReady(callback: OnReadyCallback) {
    setTimeout(() => {
      callback(<UdfCompatibleConfiguration>{
        supports_search: true,
        supported_resolutions: ['1', '5', '10', '15', '30', '60', '120', '240', 'D', 'W', 'M'],
      });
    });
  }

  public resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback) {

    window.socket.emit('symbol', symbolName, (res: any) => {
      const msg = pako.inflate(res, {
        to: 'string',
      });
      const symbolInfo = JSON.parse(msg);
      if (!symbolInfo || !symbolInfo.symbol) {
        return;
      }

      onResolve({
        full_name: symbolName,
        name: symbolName,
        ticker: symbolName,
        description: symbolInfo.description,
        type: 'bitcoin',
        session: '24x7',
        exchange: '',
        listed_exchange: '',
        timezone: 'Asia/Shanghai',
        format: 'price',
        minmov: 1,
        pricescale: 10**symbolInfo.pricePrecision,
        has_intraday: true,
        supported_resolutions: ['1', '5', '10', '15', '30', '60', '120', '240', 'D', 'W', 'M'],
        intraday_multipliers: ['1', '5', '10', '15', '30', '60', '120', '240'],
        has_seconds: false,
        has_daily: true,
        has_weekly_and_monthly: false,
        has_empty_bars: false,
        force_session_rebuild: true,
        has_no_volume: false,
        volume_precision: symbolInfo.volumePrecision
      });
    });
  }

  public searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback) {
  }

  public getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: string,
    from: number,
    to: number,
    onResult: HistoryCallback,
    onError: ErrorCallback,
  ) {
    if (window.socket && window.socket.connected) {
      window.socket.emit('bars', {
        symbol: symbolInfo.name,
        resolution,
        from,
        to,
      }, (data: any) => {
        const res = JSON.parse(pako.inflate(data, {
          to: 'string'
        }));
        let bars: Bar[] = [];
        if (res && res.length > 0) {
          bars = res.map((o: Bar)=>({...o, time: o.time * 1000}));
        }

        onResult(bars, {noData: bars.length === 0});
      })
    }
  }

  public subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void,
  ): void {
    window.onTick = onTick;
    if (window.socket && window.socket.connected) {
      window.socket.emit('subscribe', {
        symbol: symbolInfo.name,
        resolution,
      });
    }
  }

  public unsubscribeBars(listenerGuid: string): void {
    const [symbol, resolution] = listenerGuid.split('_');
    if (window.socket && window.socket.connected) {
      window.socket.emit('unsubscribe', { symbol, resolution });
    }
  }
}
