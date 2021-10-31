module.exports = {
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/server.ts',
    '<rootDir>/src/infrastructure/test-server.ts',
  ],
  coverageProvider: 'v8',
  errorOnDeprecated: true,
  moduleNameMapper: {'~/(.*)': '<rootDir>/src/$1'},
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.tests.ts'],
  transform: {'.+\\.ts$': 'ts-jest'},
}
