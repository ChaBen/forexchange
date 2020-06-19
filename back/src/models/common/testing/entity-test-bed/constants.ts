import { ObjectType } from 'typeorm';
import {
  SymbolInfoEntity,
  UserEntity,
  VirtualOrderEntity,
} from '../../../entity';

export const allEntityTypes: ObjectType<any>[] = [
  SymbolInfoEntity,
  UserEntity,
  VirtualOrderEntity,
];

// export const allRepositoryTypes: ObjectType<any>[] = [];
