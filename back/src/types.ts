export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface GetBarsInput {
  symbol: string;
  resolution: string;
  from: number;
  to: number;
}

export interface RealtimeInput {
  symbol: string;
  resolution: string;
}

export type OrderInputSide = 'up' | 'down';

export interface OrderInput {
  symbol: string;
  side: OrderInputSide;
  adjust: number;
  pwd: string;
}

export interface SymbolInfo {
  symbol: string;
  description: string;
  pricePrecision: number;
  volumePrecision: number;
}

export interface ConfigApi {
  url: string;
  token: string;
  orderPwd: string;
}

export interface ConfigMysql {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
}

export interface ConfigSettings {
  ws: ConfigApi;
  rest: ConfigApi;
  mysql: ConfigMysql;
}

export type Nominal<T, Name extends string> = T & {
  [Symbol.species]: Name;
};

export type Timestamp = Nominal<number, 'Timestamp'>;
