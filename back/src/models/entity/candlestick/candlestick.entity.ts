import { Timestamp } from '../../../types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';

@Entity({
  name: 'min1',
})
export class CandlestickEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'symbol',
    length: 20,
    comment: 'symbol name',
  })
  readonly symbol!: string;

  @PrimaryColumn({
    type: 'bigint',
    name: 'time',
  })
  readonly time!: number;

  @Column({
    type: 'float',
    name: 'open',
  })
  readonly open!: number;

  @Column({
    type: 'float',
    name: 'high',
  })
  readonly high!: number;

  @Column({
    type: 'float',
    name: 'low',
  })
  readonly low!: number;

  @Column({
    type: 'float',
    name: 'close',
  })
  readonly close!: number;

  @Column({
    type: 'float',
    name: 'volume',
  })
  readonly volume!: number;

  @Column({
    type: 'datetime',
    name: 'created_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  readonly createdAt!: Timestamp;

  @Column({
    type: 'datetime',
    name: 'updated_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    onUpdate: 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  readonly updatedAt!: Timestamp;
}

@Entity('min5')
export class CandlestickMin5Entity extends CandlestickEntity {}

@Entity('min10')
export class CandlestickMin10Entity extends CandlestickEntity {}

@Entity('min15')
export class CandlestickMin15Entity extends CandlestickEntity {}

@Entity('min30')
export class CandlestickMin30Entity extends CandlestickEntity {}

@Entity('hour')
export class CandlestickHourEntity extends CandlestickEntity {}

@Entity('hour2')
export class CandlestickHour2Entity extends CandlestickEntity {}

@Entity('hour4')
export class CandlestickHour4Entity extends CandlestickEntity {}

@Entity('day')
export class CandlestickDayEntity extends CandlestickEntity {}
