import { EntityTestBed } from '../../common/testing/entity-test-bed';
import { UserEntityCreateParams, UserRepository } from './user.repository';
import { getUserDefaultData } from '../../common/testing/data';
import { UserEntity } from './user.entity';

describe('symbolInfo.repository', () => {
  let symbolInfoRepository: UserRepository;
  const defaultData = getUserDefaultData();
  const token = 'test';

  beforeAll(async () => {
    await EntityTestBed.setup();
    symbolInfoRepository = EntityTestBed.getRepository(UserRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await symbolInfoRepository.insertNewUsers(defaultData);
  });

  describe('insertNewUser', () => {
    it('should insert new symbolInfo', async () => {
      await symbolInfoRepository.insertNewUser(defaultData[0]);
      const insertedUser = await symbolInfoRepository.find();
      expect(insertedUser.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('insertNewUsers', () => {
    it('should insert new Users', async () => {
      const insertedUsers = await symbolInfoRepository.find();
      expect(insertedUsers.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('getUser', () => {
    it('should get user', async () => {
      const res = await symbolInfoRepository.getUser(token);
      expect([getDataFromEntity(res)]).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(entity: UserEntity): UserEntityCreateParams {
  return {
    token: entity.token,
  };
}
