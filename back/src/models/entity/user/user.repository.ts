import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

export interface UserEntityCreateParams {
  token: UserEntity['token'];
}

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async insertNewUser(params: UserEntityCreateParams): Promise<UserEntity> {
    return this.save(params as UserEntity, { reload: false });
  }

  async insertNewUsers(
    params: UserEntityCreateParams[],
  ): Promise<UserEntity[]> {
    return this.save(params as UserEntity[], { reload: false });
  }

  async getUser(token: string): Promise<UserEntity | undefined> {
    return this.findOne({ where: { token } });
  }
}
