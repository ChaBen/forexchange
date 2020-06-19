import { RestPeriod } from '../../types';

export interface RestKlineRequest {
  symbol: string;
  period: RestPeriod;
  datest: string;
  dateed: string;
}
