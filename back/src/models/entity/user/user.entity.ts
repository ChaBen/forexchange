import { Column, Entity, PrimaryColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';
import { Timestamp } from '../../../types';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'token',
    length: 20,
  })
  readonly token!: string;

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
