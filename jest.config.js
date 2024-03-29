module.exports = {
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.ts',
    '<rootDir>/src/infrastructure/builders/*',
    '<rootDir>/src/infrastructure/test/*',
    '<rootDir>/src/startup/*',
  ],
  coverageProvider: 'v8',
  errorOnDeprecated: true,
  moduleNameMapper: { '~/(.*)': '<rootDir>/src/$1' },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: { '.+\\.ts$': 'ts-jest' },
}
