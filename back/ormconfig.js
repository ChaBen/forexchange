const config = require('config');
const entities =
  process.env.NODE_ENV === 'production'
    ? ['dist/models/entity/**/*.entity.js']
    : ['src/models/entity/**/*.entity.ts'];

module.exports = {
  ...config.mysql,
  type: 'mysql',
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  supportBigNumbers: true,
  bigNumberStrings: false,
  entities,
};
