module.exports = {
  displayName: 'quiz-ap1',
  rootDir: './',
  roots: ['<rootDir>/tests'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setup.ts'],
  globalSetup: './globalSetup.ts',
  globalTeardown: './globalTeardown.ts',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
