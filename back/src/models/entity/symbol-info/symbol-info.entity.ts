import { Column, Entity, PrimaryColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';
import { Timestamp } from '../../../types';

@Entity({
  name: 'symbol_info',
})
export class SymbolInfoEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'symbol',
    length: 20,
    comment: 'symbol name',
  })
  readonly symbol!: string;

  @Column({
    type: 'varchar',
    name: 'description',
  })
  readonly description!: string;

  @Column({
    type: 'int',
    name: 'price_precision',
  })
  readonly pricePrecision!: number;

  @Column({
    type: 'int',
    name: 'volume_precision',
  })
  readonly volumePrecision!: number;

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
