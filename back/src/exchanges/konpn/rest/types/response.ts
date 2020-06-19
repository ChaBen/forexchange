export interface RestResponse<T> {
  Code: number;
  Msg: string;
  Obj: T;
}

export interface KlineRaw {
  C: number;
  Tick: number;
  O: number;
  H: number;
  L: number;
  V: number;
}

export interface TickRaw {
  N: string;
  S: string;
  P: number;
  V: number;
}
