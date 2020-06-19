export interface KlineResponse {
  time: number;
  volume: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface TickResponse {
  symbol: string;
  name: string;
  volume: number;
  price: number;
}

export interface ErrorResponse {
  errorMsg: string;
}
