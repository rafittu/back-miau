module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    '/common/app_error',
    '/main.ts',
    '/prisma.service.ts',
    '.*\\.config\\.ts$',
    '.*\\.module\\.ts$',
  ],
  testEnvironment: 'node',
};
