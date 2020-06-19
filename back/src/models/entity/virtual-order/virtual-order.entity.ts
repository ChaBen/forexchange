import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';
import { OrderInputSide, Timestamp } from '../../../types';

@Entity({
  name: 'virtual_order',
})
export class VirtualOrderEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
    comment: 'primary auto generated id',
  })
  readonly id!: string;

  @Column({
    type: 'varchar',
    name: 'symbol',
    length: 20,
    comment: 'symbol name',
  })
  readonly symbol!: string;

  @Column({
    type: 'bigint',
    name: 'time',
  })
  readonly time!: number;

  @Column({
    type: 'varchar',
    name: 'side',
    length: 4,
  })
  readonly side!: OrderInputSide;

  @Column({
    type: 'float',
    name: 'adjust',
  })
  readonly adjust!: number;

  @Column({
    type: 'float',
    name: 'price',
  })
  readonly price!: number;

  @Column({
    type: 'float',
    name: 'adjusted_price',
  })
  readonly adjustedPrice!: number;

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
